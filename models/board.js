(function () {
  'use strict';

  var _ = window._;
  var app = window.app;

  var Board = app.Board = app.Model.extend({
    initialize: function () {
      this.repos = new app.Repo.Collection();
      this.repos.owner = this;
      this.issues = new app.Issue.Collection();
      this.issues.listenTo(this.repos, 'add', function (repo) {
        this.listenTo(repo.issues, 'add', function (issue) {
          this.add(issue);
        });
        this.listenTo(repo.issues, 'remove', function (issue) {
          this.remove(issue);
        });
      });
      this.issues.listenTo(this.repos, 'remove', function (repo) {
        this.stopListening(repo.issues);
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

    urlRoot: '/boards'
  });

  Board.Collection = app.Model.Collection.extend({
    model: Board,

    url: '/boards'
  });
})();
