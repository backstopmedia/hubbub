(function () {
  'use strict';

  var $ = window.jQuery;
  var _ = window._;
  var app = window.app;

  app.MainView = app.View.extend({

    className: "row-fluid",

    render: function () {

      this.sideBarView = new app.SidebarView({collection:app.board.repos});
      this.defaultIssuesView = new app.IssueListView({collection:app.board.defaultIssues, title:"Uncategorized"});
      this.todoIssuesView = new app.IssueListView({collection:app.board.todoIssues, title:"To Do"});
      this.doingIssuesView = new app.IssueListView({collection:app.board.doingIssues, title:"Doing"});
      this.doneIssuesView = new app.IssueListView({collection:app.board.doneIssues, title:"Done"});

      this.$el.append([
        this.sideBarView.render().el,
        this.defaultIssuesView.render().el,
        this.todoIssuesView.render().el,
        this.doingIssuesView.render().el,
        this.doneIssuesView.render().el
      ]);

      return this;
    },

    remove: function () {
      this.sideBarView.remove();
      this.defaultIssuesView.remove();
      this.todoIssuesView.remove();
      this.doingIssuesView.remove();
      this.doneIssuesView.remove();
      return app.View.prototype.remove.call(this);
    }
  });
})();
