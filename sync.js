(function () {
  'use strict';

  var _ = window._;
  var Backbone = window.Backbone;

  // Store the original `Backbone.sync`.
  var sync = Backbone.sync;

  // Override the stock `Backbone.sync` method so that the app can:
  //
  //  A. READ from GitHub's API.
  //  B. READ/CREATE/UPDATE/DELETE from localStorage.
  //  C. Not have to alter any other Backbone methods to do so.
  Backbone.sync = function (method, model, options) {

    // READ is the only case to proxy to the original `Backbone.sync`,
    // but only if the `options.remote` flag is set to `true`.
    if (method === 'read' && options.remote) {
      options.data = _.extend({per_page: 100}, options.data);
      return sync.apply(this, arguments);
    }

    // Use `localStorage` for persistence.
    var ls = window.localStorage;

    // Store the response data in `res`.
    var res;

    // Use the model's URL as a unique storage identifier.
    var url = _.result(model, 'urlRoot') || _.result(model, 'url');

    // Grab the models hash for the endpoint.
    var models = ls.getItem(url);
    models = models ? JSON.parse(models) : {};

    // Start a switch to cover every CRUD case.
    switch (method) {

    // For this project, CREATE and UPDATE will take the same action.
    case 'create':
    case 'update':
      // Grab the serialized data from the model.
      res = model.toJSON(options);

      // In the CREATE case, we need to give the model a unique `id`.
      if (method === 'create') {
        var next = 1;
        // Iterate over the existing `id`s and find the next available one.
        for (var id in models) if (next < +id) next = +id + 1;
        res.id = next;
      }

      // Save the model to `localStorage`
      models[res.id] = res;
      ls.setItem(url, JSON.stringify(models));
      break;

    // Set the appropriate response data for READ.
    case 'read':
      res = model instanceof Backbone.Model ?
        models[model.id] || {} :
        _.values(models) || [];
      break;

    // Destroy a model from `localStorage` based on its endpoint.
    case 'delete':
      res = {};
      delete models[model.id];
      ls.setItem(url, JSON.stringify(models));
    }

    // Fire the success callback.
    options.success(model, res, options);
  };

  // Override `Backbone.ajax` for JSONP support.
  var ajax = Backbone.ajax;
  Backbone.ajax = function (options) {
    var success = options.success;
    options.success = function (resp, __, xhr) {
      var meta = xhr.meta = resp.meta;
      var data = xhr.data = resp.data;
      xhr.status = meta.status;
      if (meta.status < 300) return success(data);
      options.error(xhr);
    };
    options.dataType = 'jsonp';
    return ajax.apply(this, arguments);
  };
})();
