(function () {
  'use strict';

  var $ = window.jQuery;
  var _ = window._;
  var app = window.app;

  app.IssueListView = app.View.extend({
    className: 'js-issue-list span2',

    template: _.template($('#js-issue-list-template').html()),

    initialize: function () {
      // TODO make more efficient?
      this.listenTo(this.collection, 'add remove', _.debounce(this.render));
    },

    events: {
      "click li": "editIssue"
    },

    editIssue: function(ev) {
      var issueId = $(ev.target).attr('data-issue-id');
      var category = window.prompt("Please enter category (todo,doing,done):");
      if(category){
        this.collection.get(issueId).save({category:category});
      }
    },

    render: function () {
      this.$el.html(this.template({
        title: this.options.title,
        issues: this.collection
      }));
      return this;
    }
  });
})();
