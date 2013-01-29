(function () {
  'use strict';

  var $ = window.jQuery;
  var _ = window._;
  var app = window.app;

  app.ItemView = Backbone.View.extend({
    tagName: "li",

    template: _.template($('#js-issue-item-template').html()),

    initialize: function () {
      this.listenTo(this.model.repo, 'change:isActive', this.toggle);
    },

    render: function () {
      this.$el.html(this.template({issue: this.model}));
      this.toggle();
      return this;
    },

    toggle: function () {
      this.$el[this.model.repo.get('isActive') ? 'show' : 'hide']();
    }
  });
})();
