(function (window) {
  'use strict';

  var app = window.app;
  var Backbone = window.Backbone;

  var Issue = app.Issue = app.Issue || {};

  Issue.Collection = Backbone.Collection.extend({

    model: Issue.Model,

    // Default sorting for issues will be reverse chronological order, newest
    // on top.
    comparator: function (issue) {
      return -1 * Date.parse(issue.get('created_at'));
    },

    url: function () {
      return this.repo.url() + '/issues';
    },

    // Specify that this Collection should represent a filtered set of models from the provided `parent` Collection.
    setFilter: function(parent, testKey, testValue) {
      var self = this;
      var onAdd = function(model) {
        // only add to this collection if the model passes the filter
        if (model.get(testKey) === testValue) {
          self.add(model);
        }
      };
      // If there are any existing models in the collection run them through the add
      parent.each(onAdd);

      this.listenTo(parent, {
        // When a model is added to the parent, add it to this collection if it matches the test key / value
        add: onAdd,
        // When a model is removed from the parent, remove it from this collection. This method is a "no op"  if the
        // collection doesn't contain the model.
        remove: self.remove
      });
      // Listen to change events on the models
      this.listenTo(parent, 'change:' + testKey, function(model, value) {
        if (value === testValue) {
          // If the new value matches the test value then add the model
          self.add(model);
        } else {
          // If the value doesn't match the test value then remove the model
          self.remove(model);
        }
      });
    }
  });
})(this);
