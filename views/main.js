(function () {
  'use strict';

  var $ = window.jQuery;
  var _ = window._;
  var app = window.app;

  app.MainView = app.View.extend({
    render: function () {
      var tpl = $('#js-main-view-template').html();
      this.$el.html(_.template(tpl, {}));

      // setup child views
      var sidebarView = new app.SidebarView({el: this.$('#js-sidebar')});
      sidebarView.render();

      // TODO split into categories
      var allIssuesView = new app.IssueListView({collection: app.board.allIssues});
      allIssuesView.render();
      this.$el.append(allIssuesView.$el);
    }
  });
})();
