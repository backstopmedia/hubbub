(function (window) {
  'use strict';

  var app = window.app;
  var Backbone = window.Backbone;

  var Issue = app.Issue = app.Issue || {};

  Issue.Model = Backbone.Model.extend({
    initialize: function () {
      this.repo = this.collection.repo;
    },

    url: function () {
      return this.urlRoot() + '/' + this.get('number');
    },

    urlRoot: function () {
      return this.repo.url() + '/issues';
    },

    defaults: {
      category: "default"
    }
  });
})(this);
