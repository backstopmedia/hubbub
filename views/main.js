(function () {
  'use strict';

  var $ = window.jQuery;
  var _ = window._;
  var app = window.app;

  app.MainView = app.View.extend({

    initialize: function(){




    },

    handleIssueChange: function(issue){


    },

    className:"row-fluid",

    render: function () {
      this.$el.html(this.template());

      this.sideBarView = new app.SidebarView();


      // setup child views
      var sidebarView = new app.SidebarView();
      sidebarView.render();
      this.$el.append(sidebarView.$el);

      // TODO split into categories
      var issuesView = new app.IssueListView({collection: app.board.issues});
      issuesView.render();
      this.$el.append(issuesView.$el);
    }
  });
})();
