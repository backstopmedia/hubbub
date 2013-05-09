(function () {
  'use strict';

  var Backbone = window.Backbone;
  var $ = window.jQuery;
  var _ = window._;
  var app = window.app;

  app.MainView = Backbone.View.extend({

    initialize : function() {
      this.views = {};
    },

    render: function () {
      // create and insert each of the columns

      this.sideBarView = new app.SidebarView();
      this.views.defaultIssuesView = new app.IssueHolderView({testKey:"category", testValue:"default", title:"Uncategorized"});
      this.views.todoIssues = new app.IssueHolderView({testKey:"category", testValue:"todo", title:"To Do"});
      this.views.doingIssues = new app.IssueHolderView({testKey:"category", testValue:"doing", title:"Doing"});
      this.views.doneIssues = new app.IssueHolderView({testKey:"category", testValue:"done", title:"Done"});

      this.$el.append(
        this.sideBarView.render().el,
        $('<div class="issue-lists">').html(
          _.chain(this.views).invoke('render').pluck('el').value()
        )
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

    closeIssueModal: function () {
      // ...if it exists
      if (this.issueModal) {
        this.issueModal.close();
      }
    },

    remove: function () {
      // make sure each of the columns are removed
      this.sideBarView.remove();
      _.invoke(this.views, 'remove');
      return Backbone.View.prototype.remove.call(this);
    }
  });
})();
