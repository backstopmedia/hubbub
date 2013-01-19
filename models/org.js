(function () {
  'use strict';

  var app = window.app;

  var Org = app.Org = app.User.extend({
    urlRoot: app.apiRoot + '/orgs'
  });

  Org.Collection = app.User.Collection.extend({
    model: Org,

    url: app.apiRoot + '/orgs'
  });
})();
