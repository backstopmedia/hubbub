(function () {
  'use strict';

  var $ = window.jQuery;
  var _ = window._;
  var Backbone = window.Backbone;
  var app = window.app;

  app.SidebarView = Backbone.View.extend({
    template: _.template($('#js-sidebar-template').html()),

    id: 'sidebar',

    render: function () {
      var repos = app.board.repos;
      this.$el.html(this.template({repos: repos}));

      this.repoSearchView = new app.RepoSearchView({
        el: this.$('.repo-search')
      });

      var repoFilterView = this.repoFilterView = new app.ListView({
        tagName: 'ul',
        className: 'js-repo-filter',
        collection: repos,
        modelView: app.RepoFilterItemView
      });
      repoFilterView.render();
      repoFilterView.$el.appendTo(this.$el);

      return this;
    }
  });
})();
