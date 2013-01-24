(function () {
  'use strict';

  var $ = window.jQuery;
  var _ = window._;
  var app = window.app;

  app.MainView = app.View.extend({
    template: _.template($('#js-main-view-template').html()),

    render: function () {
      this.$el.html(this.template());

      // setup child views
      var sidebarView = new app.SidebarView({el: this.$('#js-sidebar')});
      sidebarView.render();

      // TODO split into categories
      var issuesView = new app.IssueListView({collection: app.board.issues});
      issuesView.render();
      this.$el.append(issuesView.$el);
    }
  });
})();
