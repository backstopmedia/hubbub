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

    initialize: function() {
      var welcome = new app.WelcomeModalView();
      welcome.render();
    },

    issue: function(issueId){
      if (!this.currentView) this.manage();
      var issue = app.board.issues.get(issueId);
      this.modal = new app.IssueModalView({model: issue});
      this.modal.render();
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
