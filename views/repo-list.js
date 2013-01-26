(function () {
  'use strict';

  var $ = window.jQuery;
  var _ = window._;
  var app = window.app;

  app.RepoListView = app.View.extend({
    className: 'js-repo-list',
    tagName:"ul",
    template: _.template($('#js-repo-list-template').html()),

    initialize: function () {
      this.listenTo(this.collection, 'add remove', _.debounce(this.render));
    },

    render: function () {
      this.$el.html(this.template({
        repos: this.collection
      }));
      return this;
    }
  });
})();
