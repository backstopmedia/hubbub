(function () {
  'use strict';

  var app = window.app;
  var Backbone = window.Backbone;

  app.Model = Backbone.Model.extend({
    parse: function (res, options) {
      options.parse = false;
      return options.remote ? res.data : res;
    }
  });
})();
