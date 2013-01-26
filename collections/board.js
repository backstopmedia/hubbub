(function (window) {
  'use strict';

  var app = window.app;

  var Board = app.Board = app.Board || {};

  Board.Collection = Backbone.Collection.extend({
    model: Board.Model,

    url: '/boards'
  });
})(this);
