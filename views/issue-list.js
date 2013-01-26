(function () {
  'use strict';

  var $ = window.jQuery;
  var _ = window._;
  var app = window.app;

  app.IssueListView = app.View.extend({
    className: 'js-issue-list span10',

    template: _.template($('#js-issue-list-template').html()),

    initialize: function () {
      // TODO make more efficient?
      this.listenTo(this.collection, 'add', _.debounce(this.render));
    },

    render: function () {
      this.$el.html(this.template({
        title: 'Uncategorized',
        issues: this.collection
      }));
    }
  });
})();
