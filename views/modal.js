(function () {
  'use strict';

  var $ = window.jQuery;
  var app = window.app;
  var _ = window._;


  app.ModalView = app.View.extend({
    className: 'modal',

    //todo: have base modal template

    events: {
      // you can use any jQuery selectors here
      'click .modal-mask': 'close',
      'click .modal' : 'stopPropagation',
      // note that an <input> element needs focus for this to work
      'keydown': 'keydown'
    },

    render: function () {
      // inject itself at the top of the DOM
      $('body').prepend(this.$el);
      return this;
    },

    stopPropagation: function (ev) {
      ev.stopPropagation();
    },

    close: function () {
      this.remove();
      // inform the parent that this modal has closed
      this.trigger('close');
    },

    keydown: function(ev) {
      if (ev.which === 27) { // ESC
        this.close();
      }
    }
  });
})();
