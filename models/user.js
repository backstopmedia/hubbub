(function () {
  'use strict';

  var app = window.app;

  var User = app.User = {};

  User.Model = Backbone.Model.extend({
    initialize: function () {
      this.repos = new app.Repo.Collection();
      this.repos.owner = this;
    },

    url: function () {
      return this.urlRoot + '/' + this.get('login');
    },

    urlRoot: app.apiRoot + '/users'
  });

  User.Collection = app.Model.Collection.extend({
    model: User.Model,

    url: app.apiRoot + '/users'
  });
})();
