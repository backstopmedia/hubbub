(function () {
  'use strict';

  var app = window.app;
  var Backbone = window.Backbone;

  var Model = app.Model = Backbone.Model.extend({});

  Model.Collection = Backbone.Collection.extend({
    model: Model
  });
})();
