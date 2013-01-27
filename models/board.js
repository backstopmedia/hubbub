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

      this.issues.listenTo(this.repos, {
        add: function (repo) {

          // When an Issue is added to the Repo, add it to the global
          // Collection.
          this.listenTo(repo.issues, 'add', this.add);

          // When an Issue is added to the Repo, remove it from the global
          // Collection.
          this.listenTo(repo.issues, 'remove', this.remove);
        },

        // When Repo is removed, stop listening to its events and remove all of
        // that repo's issues.
        remove: function (repo) {
          this.stopListening(repo.issues);
          _.invoke(repo.issues.models.slice(), 'destroy');
        }
      });

      // Save the board when a repo is destroyed.
      this.listenTo(this.repos, 'remove', function () { this.save(); });
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
    },

    // preferable to provide a getter function than to access private variables
    getRepos: function () {
      return this.repos;
    }
  });
})(this);
