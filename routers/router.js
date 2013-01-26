(function () {
  'use strict';

  var $ = window.jQuery;
  var Backbone = window.Backbone;
  var app = window.app;

  app.Router = Backbone.Router.extend({
     routes:{
       "": "manage",
       "issue/:id": "issue"
     },

    initialize: function(){
      this.welcome();
    },

    issue: function(issueId){
      //If someone navigates directly to an issue we need to make sure the boards are loaded in the background
      if(!this.currentView){
        this.manage();
      }
      var issue = app.board.issues.get(issueId);
      this.modal = new app.IssueModalView({model: issue});
      this.modal.render();
    },

    welcome: function(){
      this.closeModal();
      var modal = new app.WelcomeModalView();
      modal.render();
    },

    manage: function(){
      this.closeModal();

      // If there is an existing view, then remove it and clear any listeners
      if (this.currentView) this.currentView.remove();
      this.currentView = new app.MainView();
      $('#app-container').append(this.currentView.render().el);
    },

    closeModal: function() {
      if (this.modal) {
        this.modal.remove();
      }
    }
  });

})();
