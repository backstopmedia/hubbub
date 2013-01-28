(function (window) {
  'use strict';

  var app = window.app;
  var Backbone = window.Backbone;
  var $ = window.jQuery;

  app.Router = Backbone.Router.extend({
    initialize: function (options) {
      this.mainView = options.mainView;
    },

    routes: {
      '': 'manage',
      'issue/:id': 'issue'
    },

    manage: function () {
      this.mainView.closeIssueModal();
    },

    issue: function (issueId) {
      this.mainView.showIssueModal(issueId);
    }
  });
})(this);
