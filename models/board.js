(function () {
  'use strict';

  var _ = window._;
  var app = window.app;

  var Board = app.Board = app.Model.extend({
    initialize: function () {
      this.repos = new app.Repo.Collection();
      this.repos.owner = this;

      this.allIssues = new app.Issue.Collection();

      // retrieve all issues for any newly added repos
      this.listenTo(this.repos, 'add', function (repo) {
        // TODO not sure why silent:false is needed here
        repo.issues.fetch({remote: true, silent: false});
      } );
    },

    parse: function (res) {
      this.repos.update(res.repos);
      delete res.repos;
      return res;
    },

    toJSON: function () {
      var attrs = _.clone(this.attributes);
      attrs.repos = this.repos.pluck('id');
      return attrs;
    },

    urlRoot: '/boards'
  });

  Board.Collection = app.Model.Collection.extend({
    model: Board,

    url: '/boards'
  });
})();
