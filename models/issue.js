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
    },

    displayName: function () {
      var repo = this.repo.displayName();
      var number = this.get('number');
      var title = this.get('title');
      return repo + '#' + number + ': ' + title;
    }
  });

  Issue.Collection = app.Model.Collection.extend({

    // Default sorting for issues will be reverse chronological order, newest
    // on top.
    comparator: function (issue) {
      return -+new Date(issue.get('created_at'));
    },

    model: Issue,

    url: function () {
      return this.repo.url() + '/issues';
    }
  });
})();
