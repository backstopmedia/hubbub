(function () {
  'use strict';

  var $ = window.jQuery;
  var _ = window._;
  var app = window.app;

  app.ListView = app.View.extend({
    initialize: function () {
      this.views = {};
      this.listenTo(this.collection, {
        add: this.addModel,
        sort: this.sortModels,
        remove: this.removeModel
      });
      this.collection.each(_.bind(this.addModel, this));
    },

    addModel: function (model) {
      this.$el.append((this.views[model.cid] = new this.options.modelView({
        collection: this.collection,
        model: model
      })).render().el);
    },

    sortModels: function () {
      var views = this.views;
      var $el = this.$el;
      var $models = $el.children();
      this.collection.each(function (model, i) {
        var view = views[model.cid];
        if (!view) return;
        var el = view.el;
        if (!$models[i]) {
          $el.append(el);
        } else if ($models[i] !== el) {
          $models.eq(i).before(el);
          $models = $($models.get().splice(i, 0, el));
        }
      });
    },

    removeModel: function (model) {
      this.views[model.cid].remove();
      delete this.views[model.cid];
    }
  });
})();
