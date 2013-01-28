(function () {
  'use strict';

  var $ = window.jQuery;
  var _ = window._;
  var app = window.app;

  app.MainView = app.View.extend({

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
      var modal = this.welcomeModal = new app.WelcomeModalView();
      modal.render();

      // listen to custom event fired from the modal
      this.listenTo(modal, 'close', function () {
        // remove the reference to the modal, since we don't need it anymore
        delete this.welcomeModal;
      });
    },

    showIssueModal: function (issueId) {
      var issue = app.board.issues.get(issueId);
      var modal = this.issueModal = new app.IssueModalView({model: issue});
      modal.render();

      // listen to custom event fired from the modal
      this.listenTo(modal, 'close', function () {
        // notify the Router that we've returned to the 'manage' view
        app.router.navigate('');
        // remove the reference to the modal, since we don't need it anymore
        delete this.issueModal;
      });
    },

    closeModals: function () {
      // ...if they exist

      if (this.welcomeModal) {
        this.welcomeModal.close();
      }

      if (this.issueModal) {
        this.issueModal.close();
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
