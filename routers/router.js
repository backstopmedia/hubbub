(function (window) {
  'use strict';

  var app = window.app;

  app.Router = Backbone.Router.extend({
    initialize: function () {
      var welcome = new app.WelcomeModalView();

      // Only show the welcome modal if the user hasn't opted out of it. This
      // ensures the welcome message will always be shown at least once, and
      // multiple times for those who don't want to hide it.
      if (app.board.get('showWelcome')) welcome.render();
    },

    routes: {
      '': 'manage',
      'issue/:id': 'issue'
    },

    manage: function () {
      this.resetState();

      // If there is an existing view, then remove it and clear any listeners
      this.currentView = new app.MainView();
      $('#app-container').append(this.currentView.render().el);
    },

    issue: function (issueId) {
      // FIXME Is this needed here? The following line would always be true, if
      // that is the case.
      //this.resetState();

      if (!this.currentView) this.manage();
      var issue = app.board.issues.get(issueId);
      this.modal = new app.IssueModalView({model: issue});
      this.modal.render();
    },

    resetState: function () {
      if (this.modal) {
        this.modal.remove();
        delete this.modal;
      }

      if (this.currentView) {
        this.currentView.remove();
        delete this.currentView;
      }
    }
  });
})(this);
