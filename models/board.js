(function () {
  'use strict';

  var _ = window._;
  var app = window.app;

  var Board = app.Board = app.Model.extend({
    initialize: function () {
      this.repos = new app.Repo.Collection();
      this.repos.owner = this;
    },

    parse: function (res) {
      if (!res) return {};
      this.repos.update(res.repos);
      delete res.repos;
      return res;
    },

    toJSON: function () {
      var attrs = _.clone(this.attributes);
      attrs.repos = this.repos.toJSON();
      return attrs;
    },

    urlRoot: '/boards'
  });

  Board.Collection = app.Model.Collection.extend({
    model: Board,

    url: '/boards'
  });
})();
