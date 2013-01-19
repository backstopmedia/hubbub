(function () {
  'use strict';

  var app = window.app;

  var Issue = app.Issue = app.Model.extend({
    urlRoot: app.apiBase + '/issues'
  });

  Issue.Collection = app.Collection.extend({
    model: Issue,

    url: app.apiBase + '/issues'
  });
})();
