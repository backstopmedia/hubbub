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
      'click .modal-mask': 'removeAndBack',
      'click .modal' : 'stopPropagation'
    },

    stopPropagation: function (ev){
      ev.stopPropagation();
    },

    removeAndBack: function (){
      this.remove();
      // todo: later change to navigate to ""
      app.router.navigate("manage");
    }
  });
})();
