(function () {
  'use strict';

  var $ = window.jQuery;
  var _ = window._;
  var app = window.app;

  app.RepoFilterItemView = Backbone.View.extend({
    template: _.template($('#js-repo-filter-item-template').html()),
    tagName: 'li',
    className: 'js-repo-filter-item',
    events: {
      'change input': 'applyFilter',
      'click .js-refresh': 'refresh',
      'click .js-remove': 'destroy'
    },

    applyFilter: function () {
      this.model.set('isActive', this.$('input').is(':checked'));
      this.model.save();
    },

    initialize: function () {
      this.listenTo(this.model, {
        request: this.onRequest,
        sync: this.onSync,
        error: this.onError,
        'change:isActive': this.toggle
      });
      this.listenTo(this.model.issues, {
        request: this.onRequest,
        sync: this.onSync,
        error: this.onError
      });
    },

    onRequest: function () {
      this.$el
        .attr('title', 'Refreshing this repo...')
        .removeClass('js-success js-error').addClass('js-pending');
    },

    onSync: function () {
      this.$el
        .attr('title', 'Repo refreshed successfully!')
        .removeClass('js-pending js-error').addClass('js-success');
      this.clearStatus(5000);
    },

    onError: function (model, xhr) {
      this.$el
        .attr('title', xhr.status + ' Error: ' + xhr.data.message)
        .removeClass('js-pending js-success').addClass('js-error');
      this.clearStatus(10000);
    },

    clearStatus: function (wait) {
      clearTimeout(this.statusTimeout);
      var self = this;
      _.delay(function () {
        self.$el
          .removeAttr('title')
          .removeClass('js-pending js-success js-error');
      }, wait);
    },

    refresh: function () {
      this.model.fetch({
        remote: true,
        success: function (repo) {
          var remove = function (issue) { issue.destroy(); };
          repo.issues.on('remove', remove);
          repo.issues.fetch({
            remote: true,
            success: function () { repo.issues.off('remove', remove); }
          });
        }
      });
    },

    destroy: function () {
      this.model.destroy();
    },

    render: function () {
      this.$el.html(this.template({repo: this.model}));
      return this;
    }
  });
})();
