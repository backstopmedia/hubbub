(function (window) {
  'use strict';

  var app = window.app;

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

    displayName: function () {
      var repo = this.repo.displayName();
      var number = this.get('number');
      var title = this.get('title');
      return repo + '#' + number + ': ' + title;
    },

    defaults: {
      category: "default"
    }
  });
})(this);
