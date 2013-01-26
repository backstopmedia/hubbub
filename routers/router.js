(function () {
  'use strict';

  var $ = window.jQuery;
  var Backbone = window.Backbone;
  var app = window.app;

  app.Router = Backbone.Router.extend({
     routes:{
       "manage": "manage",
       "": "welcome",
       "issue/:id": "issue"
     },

    issue: function(issueId){
      var issue = app.board.issues.get(issueId);
      var modal = new app.IssueModalView({model: issue});
      modal.render();
    },

    manage: function(){
      // If there is an existing view, then remove it and clear any listeners
      if (this.currentView) this.currentView.remove();
      this.currentView = new app.MainView();
      $('#app-container').append(this.currentView.render().el);
    },

    welcome: function(){
      if (this.currentView) this.currentView.remove();
      this.currentView = new app.WelcomeView();
      $('#app-container').append(this.currentView.render().el);
    }
  });

})();
