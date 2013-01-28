(function () {
  'use strict';

  var app = window.app;
  var Backbone = window.Backbone;

  app.Router = Backbone.Router.extend({
    routes: {
      // the base URL - "managing" the lists of issues
      '': 'manage',
      // an alias for the root URL
      'issues': 'manage',
      // viewing a particular issue
      'issues/:id': 'issue'
    },

    initialize: function (options) {
      this.mainView = options.mainView;
    },

    manage: function () {
      this.mainView.closeModals();
    },

    issue: function (issueId) {
      this.mainView.showIssueModal(issueId);
    }
  });
})();
