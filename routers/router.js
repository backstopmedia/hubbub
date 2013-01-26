(function(window) {
  'use strict';

  var app = window.app;

  app.Router = Backbone.Router.extend({
    initialize: function() {
      var welcome = new app.WelcomeModalView();
      welcome.render();
    },

    routes:{
      '': 'manage',
      'issue/:id': 'issue'
    },

    manage: function(){
      this.resetState();

      // If there is an existing view, then remove it and clear any listeners
      this.currentView = new app.MainView();
      $('#app-container').append(this.currentView.render().el);
    },

    issue: function(issueId){
      //this.resetState();

      if (!this.currentView) this.manage();
      var issue = app.board.issues.get(issueId);
      this.modal = new app.IssueModalView({model: issue});
      this.modal.render();
    },

    resetState: function() {
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
