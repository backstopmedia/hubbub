(function () {
  'use strict';

  var app = window.app;
  var Backbone = window.Backbone;

  app.Collection = Backbone.Collection.extend({
    parse: function (res, options) {
      options.parse = false;
      return options.remote ? res.data : res;
    }
  });
})();
