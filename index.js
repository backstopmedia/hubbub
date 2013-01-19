(function () {
  'use strict';

  var $ = window.jQuery;

  // Define the global namespace for the app.
  var app = window.app = {

    // Define the base for GitHub's API endpoints.
    apiRoot: 'https://api.github.com',

    // Set up initial view, load initial data, etc...
    init: function () {
      // TODO
    }
  };

  // Run the `init` function once the DOM is ready, unless this is run from the
  // test runner.
  if (window.ENV !== 'test') $(app.init);
})();
