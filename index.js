(function () {
  'use strict';

  var $ = window.jQuery;
  var Backbone = window.Backbone;

  // Define the global namespace for the app.
  var app = window.app = {

    // Define the base for GitHub's API endpoints.
    apiRoot: 'https://api.github.com',

    // Set up initial view, load initial data, etc...
    init: function () {
      app.board = new app.Board({id: 1});

      // retrieve previously saved data from localhost
      app.board.fetch();

      app.router = new app.Router();
      Backbone.history.start();

    }
  };

  // Run the `init` function once the DOM is ready, unless this is run from the
  // test runner.
  if (window.ENV !== 'test') $(app.init);
})();
