(function () {
  'use strict';

  var $ = window.jQuery;
  var _ = window._;
  var app = window.app;

  app.MainView = app.View.extend({

    className: "row-fluid clearfix",

    // assume this is only being rendered once
    render: function () {
      this.sideBarView = new app.SidebarView({collection:app.board.repos});
      this.defaultIssuesView = new app.IssueHolderView({testKey:"category", testValue:"default", title:"Uncategorized"});
      this.todoIssuesView = new app.IssueHolderView({testKey:"category", testValue:"todo", title:"To Do"});
      this.doingIssuesView = new app.IssueHolderView({testKey:"category", testValue:"doing", title:"Doing"});
      this.doneIssuesView = new app.IssueHolderView({testKey:"category", testValue:"done", title:"Done"});

      var $issueLists = $('<div class="issue-lists">');
      $issueLists.append(
        this.defaultIssuesView.render().el,
        this.todoIssuesView.render().el,
        this.doingIssuesView.render().el,
        this.doneIssuesView.render().el
      );

      this.$el.append(
        this.sideBarView.render().el,
        $issueLists
      );

      // Only show the welcome modal if the user hasn't opted out of it. This
      // ensures the welcome message will always be shown at least once, and
      // multiple times for those who don't want to hide it.
      if (app.board.get('showWelcome')) {
        this.showWelcomeModal();
      }

      return this;
    },

    showWelcomeModal: function () {
      var welcomeModal = new app.WelcomeModalView();
      welcomeModal.render();
    },

    showIssueModal: function (issueId) {
      // make sure no other issues are open
      this.closeIssueModal();

      var issue = app.board.issues.get(issueId);
      this.issueModal = new app.IssueModalView({model: issue});
      this.issueModal.render();
    },

    closeIssueModal: function () {
      // remove any existing modal
      if (this.issueModal) {
        this.issueModal.remove();
        delete this.issueModal;
      }
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
