(function () {
  'use strict';

  var $ = window.jQuery;
  var _ = window._;
  var app = window.app;

  app.IssueHolderView = Backbone.View.extend({
    className: 'issue-list',

    initialize: function(options) {
      this.options.collection = new app.Issue.Collection();
      this.options.collection.setFilter(app.board.issues, options.testKey, options.testValue);
    },

    template: _.template($('#js-issue-list-template').html()),

    render: function () {
      this.$el.html(this.template({
        title: this.options.title
      }));
      this.listView = new app.IssueListView(_.extend({}, this.options, {
        modelView: app.ItemView,
        el: this.$('ul')
      }));
      return this;
    }
  });
})();
