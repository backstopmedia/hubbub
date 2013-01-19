(function () {
  'use strict';

  var app = window.app;
  var Backbone = window.Backbone;

  app.Model = Backbone.Model.extend({
    parse: function (res, options) {
      options.parse = false;
      if (options.remote) {
        if (res.data.message === 'Not Found') return this.attributes;
        return res.data;
      }
      return res;
    }
  });
})();
