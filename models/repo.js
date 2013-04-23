(function (window) {
  'use strict';

  var _ = window._;
  var app = window.app;
  var Backbone = window.Backbone;

  var Repo = app.Repo = app.Repo || {};

  Repo.Model = Backbone.Model.extend({
    initialize: function () {
      this.issues = new app.Issue.Collection();
      this.issues.repo = this;

      // When this repo is destroyed, destroy its issues too.
      this.on('destroy', function () {
        _.invoke(this.issues.models.slice(), 'destroy');
      });
    },

    url: function () {
      return app.apiRoot + '/repos/' + this.get('full_name');
    },

    urlRoot: function () {
      return app.apiRoot + '/users/' + this.get('owner').login + '/repos';
    },

    toBoard: function () {
      var attrs = _.pick(this.attributes, 'id', 'name');
      attrs.owner = {login: this.get('owner').login};
      return attrs;
    }
  });
})(this);
