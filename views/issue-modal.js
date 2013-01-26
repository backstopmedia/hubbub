(function () {
  'use strict';

  var $ = window.jQuery;
  var app = window.app;
  var _ = window._;

  var tpl = $('#js-issue-modal-template').html();

  app.IssueModalView = app.View.extend({
    className: 'issue-modal',

    events: {
      "click .modal-mask": "remove"
    },

    render: function () {
      this.$el.html(_.template(tpl, {issue: this.model}));
      $('body').prepend(this.$el);
    }
  });
})();
