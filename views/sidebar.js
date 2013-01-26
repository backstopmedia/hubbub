(function () {
  'use strict';

  var $ = window.jQuery;
  var _ = window._;
  var app = window.app;

  app.SidebarView = app.View.extend({
    template: _.template($('#js-repo-filter-list-template').html()),

    className:"span2",
    id: "js-sidebar",

    events: {
      "change input" : "filterRepos"
    },

    filterRepos: function(){
      this.$('input').each(function(){
        var $input = $(this);
        var issues = app.board.repos.get($input.val()).issues.models;
        if ($input.is(':checked')){
          app.board.filteredIssues.add(issues);
        } else {
          app.board.filteredIssues.remove(issues);
        }
      });
    },

    render: function(){
      this.$el.html(this.template({repos:this.collection}));
      return this;
    }


  });
})();
