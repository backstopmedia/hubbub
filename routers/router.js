(function(window) {
  'use strict';

  var app = window.app;

  app.Router = Backbone.Router.extend({
    routes:{
      '': 'manage',
      'issue/:id': 'issue'
    },

    issue: function(issueId) {
      this.resetState();

      // When clicking on an issue, display a popup modal.
      this.modal = new app.IssueModalView({
        // We need to fetch the correct issue from the issues board and assign
        // to the modal property for this View to render.
        model: app.board.issues.get(issueId)
      }).render();
    },

    manage: function(){
      this.resetState();

      // If there is an existing view, then remove it and clear any listeners
      this.currentView = new app.MainView();
      $('#app-container').append(this.currentView.render().el);
    },

    welcome: function(){
      this.resetState();

      this.currentView = new app.WelcomeView();
      $('#app-container').append(this.currentView.render().el);
    },

    resetState: function() {
      if (this.modal) {
        this.modal.remove();
      }

      if (this.currentView) {
        this.currentView.remove();
      }
    }
  });

})(this);
