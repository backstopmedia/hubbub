(function (window) {
  'use strict';

  var _ = window._;
  var app = window.app;
  var Backbone = window.Backbone;

  var Board = app.Board = app.Board || {};

  Board.Model = Backbone.Model.extend({
    defaults: {
      showWelcome: true
    },

    urlRoot: '/boards',

    initialize: function () {
      this.repos = new app.Repo.Collection();
      this.issues = new app.Issue.Collection();

      this.on('change', function () { this.save(); });

      // Save the board when a repo is added or removed.
      this.listenTo(this.repos, {
        add: function (repo) {
          this.issues.add(repo.issues.models);
          this.issues.listenTo(repo.issues, 'add', this.issues.add);
          this.save();
        },
        remove: function (repo) {
          this.issues.stopListening(repo);
          this.save();
        }
      });

      // Save repos and issues when they are added or changed.
      this.repos.on('add change', function (repo) { repo.save(); });
      this.issues.on('add change', function (issue) { issue.save(); });
    },

    parse: function (res) {
      this.repos.update(res.repos);

      // **Don't** fetch on the collection (i.e. repos.fetch()), but
      // individually as the repos collection spans many owners and the
      // issues collection spans many repos.
      this.repos.invoke('fetch');
      _.invoke(_.pluck(this.repos.models, 'issues'), 'fetch', {update: true});
      delete res.repos;
      return res;
    },

    toJSON: function () {
      var attrs = _.clone(this.attributes);
      attrs.repos = this.repos.invoke('toBoard');
      return attrs;
    }
  });
})(this);
