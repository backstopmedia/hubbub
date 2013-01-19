(function () {
  'use strict';

  var app = window.app;
  var Backbone = window.Backbone;

  app.Collection = Backbone.Collection.extend({
    parse: function (res, options) {
      options.parse = false;
      if (options.remote) {
        if (res.data.message === 'Not Found') return this.models;
        return res.data;
      }
      return res;
    }
  });
})();
