(function () {
  'use strict';

  var app = window.app;

  var Repo = app.Repo = app.Model.extend({
    displayName: function () {
      return this.get('owner').login + '/' + this.get('name');
    },

    initialize: function () {
      this.issues = new app.Issue.Collection();
      this.issues.repo = this;

      // add all issues to the master set
      this.listenTo(this.issues, 'add', function (issue) {
        app.board.allIssues.add(issue);
      });
    },

    url: function () {
      // TODO make 'owner' an app.User
      var login = this.get('owner').login;
      var name = this.get('name');
      return app.apiRoot + '/repos/' + login + '/' + name;
    },

    urlRoot: function () {
      return app.apiRoot + '/' + this.get('owner').login + '/repos';
    }
  });

  Repo.Collection = app.Model.Collection.extend({
    model: Repo,

    url: function () {
      if (this.owner) return this.owner.url() + '/repos';
      return app.apiRoot + '/repositories';
    }
  });
})();
