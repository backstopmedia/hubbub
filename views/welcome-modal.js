(function () {
  'use strict';

  var $ = window.jQuery;
  var app = window.app;
  var _ = window._;

  app.WelcomeModalView = app.ModalView.extend({
    className: 'issue-modal',

    // TODO pre-render, since it has no variables?
    template: _.template($('#js-welcome-modal-template').html()),

    events: function(){
      return _.extend({},app.ModalView.prototype.events,{
        'click .exit': 'close',
        'change .js-toggle-show-welcome': 'toggleShowWelcome'
      });
    },

    render: function () {
      this.$el.html(this.template());
      app.ModalView.prototype.render.call(this);
      return this;
    },

    toggleShowWelcome: function (ev) {
      app.board.set('showWelcome', $(ev.currentTarget).is(':checked'));
    }
  });
})();
