(function () {
  'use strict';

  var app = window.app;

  var User = app.User = app.Model.extend({
    initialize: function () {
      this.repos = new app.Repo.Collection();
      this.repos.owner = this;
    },

    url: function () {
      return this.urlRoot + '/' + this.get('login');
    },

    urlRoot: app.apiRoot + '/users'
  });

  User.Collection = app.Collection.extend({
    model: User,

    url: app.apiRoot + '/users'
  });
})();
