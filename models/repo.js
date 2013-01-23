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
    },

    url: function () {
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
