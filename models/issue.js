(function () {
  'use strict';

  var app = window.app;

  var Issue = app.Issue = app.Model.extend({
    initialize: function () {
      this.repo = this.collection.repo;
    },

    url: function () {
      return this.urlRoot() + '/' + this.get('number');
    },

    urlRoot: function () {
      return this.repo.url() + '/issues';
    }
  });

  Issue.Collection = app.Collection.extend({
    model: Issue,

    url: function () {
      return this.repo.url() + '/issues';
    }
  });
})();
