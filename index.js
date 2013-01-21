(function () {
  'use strict';

  var $ = window.jQuery;

  // Define the global namespace for the app.
  var app = window.app = {

    // Define the base for GitHub's API endpoints.
    apiRoot: 'https://api.github.com',

    // Set up initial view, load initial data, etc...
    init: function () {
      var error = function (__, xhr) {
        $('body').append($('<div>').html('<h1>Error</h1>' + xhr.data.message));
      };
      var login = window.prompt('What is your username?');
      (new app.User({login: login})).fetch({
        remote: true,
        success: function (user) {
          $('body').append($('<div>').html('<h1>User</h1>' +
            JSON.stringify(user)));
          user.repos.fetch({
            remote: true,
            success: function (repos) {
              $('body').append($('<div>').html('<h1>Repos</h1>' +
                JSON.stringify(repos)));
              repos.each(function (repo) {
                repo.issues.fetch({
                  remote: true,
                  success: function (issues) {
                    $('body').append($('<div>').html('<h1>Issues for ' +
                      repo.get('name') + '</h1>' + JSON.stringify(issues)));
                  },
                  error: error
                });
              });
            },
            error: error
          });
        },
        error: error
      });
    }
  };

  // Run the `init` function once the DOM is ready, unless this is run from the
  // test runner.
  if (window.ENV !== 'test') $(app.init);
})();
