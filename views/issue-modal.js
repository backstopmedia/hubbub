(function () {
  'use strict';

  var $ = window.jQuery;
  var app = window.app;
  var _ = window._;

  app.IssueModalView = app.ModalView.extend({
    className: 'issue-modal',

    template: _.template($('#js-issue-modal-template').html()),

    events: _.extend({}, app.ModalView.prototype.events, {
      'change select[name="category"]': 'categoryChanged'
    }),

    render: function () {
      this.$el.html(this.template({issue: this.model}));
      app.ModalView.prototype.render.call(this);
      return this;
    },

    categoryChanged: function (ev) {
      var category = $(ev.target).val();
      this.model.set('category', category);
      this.model.save();
      this.close();
    }
  });
})();
