(function (window) {
  'use strict';

  var _ = window._;
  var app = window.app;

  var Repo = app.Repo = app.Repo || {};

  Repo.Model = Backbone.Model.extend({
    defaults: {
      isActive: true
    },

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
      return app.apiRoot + '/users/' + this.get('owner').login + '/repos';
    },

    toBoard: function () {
      var attrs = _.pick(this.attributes, 'id', 'name');
      attrs.owner = {login: this.get('owner').login};
      return attrs;
    }
  });
})(this);
