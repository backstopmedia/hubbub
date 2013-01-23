(function () {
  'use strict';

  var $ = window.jQuery;

  // Define the global namespace for the app.
  var app = window.app = {

    // Define the base for GitHub's API endpoints.
    apiRoot: 'https://api.github.com',

    // Set up initial view, load initial data, etc...
    init: function () {
      app.board = new app.Board({id: 1});
      app.board.fetch();
      $('body').append((new app.MainView()).render().el);
    }
  };

  // Run the `init` function once the DOM is ready, unless this is run from the
  // test runner.
  if (window.ENV !== 'test') $(app.init);
})();
