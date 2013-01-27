(function (window) {
  'use strict';

  var app = window.app;
  var Backbone = window.Backbone;

  var Repo = app.Repo = app.Repo || {};

  Repo.Collection = Backbone.Collection.extend({
    comparator: function (repo) { return repo.displayName(); },

    model: Repo.Model
  }, {
    withOwner: function (login) {
      var repos = new Repo.Collection();
      repos.url = app.apiRoot + '/users/' + login + '/repos';
      return repos;
    }
  });
})(this);

