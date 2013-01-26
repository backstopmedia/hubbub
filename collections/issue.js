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
        add: function(model) {
          if (model.get(testKey) === testValue) {
            self.add(model);
          }
        },
        remove: function(model) {
          self.remove(model);
        }
      });
      this.listenTo(parent, 'change:' + testKey, function(model, value) {
        if(value === testValue){
          if (!self.get(model)) self.add(model);
        } else {
          if (self.get(model)) self.remove(model);
        }
      });
      parent.each(function(model) {
        parent.trigger("add",model);
      });
    }
  });
})(this);

