(function () {
  'use strict';

  var $ = window.jQuery;
  var _ = window._;
  var app = window.app;

  var tpl = $('#js-issue-list-template').html();

  app.IssueListView = app.View.extend({
    className: 'js-issue-list',

    initialize: function () {
      // TODO make more efficient?
      this.listenTo(this.collection, 'add', this.render);
    },

    render: function () {
      this.$el.html(_.template(tpl, {
        title: 'Uncategorized',
        issues: this.collection.models
      }));
    }
  });
})();
