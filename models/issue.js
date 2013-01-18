(function () {
  'use strict';

  var app = window.app;
  var Backbone = window.Backbone;

  var Issue = app.Issue = Backbone.Model.extend({
    urlRoot: app.apiBase + '/issues'
  });

  Issue.Collection = Backbone.Collection.extend({
    model: Issue,

    url: app.apiBase + '/issues'
  });
})();
