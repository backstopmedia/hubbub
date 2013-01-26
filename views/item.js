(function () {
  'use strict';

  var $ = window.jQuery;
  var _ = window._;
  var app = window.app;

  app.ItemView = app.View.extend({
    tagName: "li",

    template: _.template($('#js-issue-item-template').html()),

    render: function () {
      this.$el.html(this.template({issue:this.model}));
      return this;
    }

  });
})();
