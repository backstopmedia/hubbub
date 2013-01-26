(function () {
  'use strict';

  var $ = window.jQuery;
  var _ = window._;
  var app = window.app;

  app.MainView = app.View.extend({

    className: "row-fluid clearfix",

    render: function () {
      this.sideBarView = new app.SidebarView({collection:app.board.repos});
      this.defaultIssuesView = new app.IssueHolderView({testKey:"category", testValue:"default", title:"Uncategorized"});
      this.todoIssuesView = new app.IssueHolderView({testKey:"category", testValue:"todo", title:"To Do"});
      this.doingIssuesView = new app.IssueHolderView({testKey:"category", testValue:"doing", title:"Doing"});
      this.doneIssuesView = new app.IssueHolderView({testKey:"category", testValue:"done", title:"Done"});

      this.$el.append(
        this.sideBarView.render().el,
        $('<div class="issue-lists">').append(
            this.defaultIssuesView.render().el,
            this.todoIssuesView.render().el,
            this.doingIssuesView.render().el,
            this.doneIssuesView.render().el
        )
      );

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
