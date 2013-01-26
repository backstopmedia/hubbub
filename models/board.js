(function (window) {
  'use strict';

  var app = window.app;

  var Board = app.Board = app.Board || {};

  Board.Model = Backbone.Model.extend({
    urlRoot: '/boards',

    initialize: function () {
      this.repos = new app.Repo.Collection();
      this.issues = new app.Issue.Collection();

      this.issues.listenTo(this.repos, {
        add: function (repo) {

          // When an Issue is added to the Repo, add it to the global
          // Collection.
          this.listenTo(repo.issues, 'add', function (issue) {
            this.add(issue);
          });

          // When an Issue is added to the Repo, remove it from the global
          // Collection.
          this.listenTo(repo.issues, 'remove', function (issue) {
            this.remove(issue);
          });
        },

        // When Repo is removed, stop listening to its events and remove all of
        // that repo's issues.
        remove: function (repo) {
          this.stopListening(repo.issues);
          repo.issues.invoke('destroy');
        }
      });

      // Persist the Repos/Issues as soon as they're added/changed, or destroy
      // them if they leave their respective Collections
      this.listenTo(this.repos, {
        remove: function () { this.save(); },
        'add change': function (repo) { repo.save(); }
      });
      this.listenTo(this.issues, {
        'add change': function (issue) { issue.save(); }
      });

      this.filteredIssues = new app.Issue.Collection();
      this.filteredIssues.listenTo(this.issues, {
        add: this.filteredIssues.add,
        remove: this.filteredIssues.remove
      });

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

  Board.Collection = Backbone.Collection.extend({
    model: Board,

    url: '/boards'
  });
})(this);
