(function (window) {
  'use strict';

  var app = window.app;

  var Issue = app.Issue = app.Issue || {};

  Issue.Collection = Backbone.Collection.extend({

    // Default sorting for issues will be reverse chronological order, newest
    // on top.
    comparator: function (issue) {
      return -+new Date(issue.get('created_at'));
    },

    model: Issue.Model,

    url: function () {
      return this.repo.url() + '/issues';
    },

    setFilter: function(parent, testKey, testValue) {
      var self = this;
      this.listenTo(parent, {
        // When a model is added to the parent, add it to this collection if it matches the test key / value
        add: function(model) {
          if (model.get(testKey) === testValue) {
            self.add(model);
          }
        },
        // When a model is removed from the parent, remove it from this collection. This method is a "no op"  if the
        // collection doesn't contain the model.
        remove: self.remove
      });
      // Listen to change events on the models
      this.listenTo(parent, 'change:' + testKey, function(model, value) {
        if(value === testValue){
          // If the new value matches the test value then add the model
          self.add(model);
        } else {
          // If the value doesn't match the test value then remove the model
          self.remove(model);
        }
      });
      parent.each(function(model) {
        parent.trigger("add",model);
      });
    }
  });
})(this);

