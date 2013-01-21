(function () {
  'use strict';

  var $ = window.jQuery;

  // Define the global namespace for the app.
  var app = window.app = {

    // Define the base for GitHub's API endpoints.
    apiRoot: 'https://api.github.com',

    // Set up initial view, load initial data, etc...
    init: function () {
      var login = window.prompt('What is your username?');
      (new app.User({login: login})).fetch({
        remote: true,
        success: function (user) {
          $('body').append($('<div>').text('User: ' + JSON.stringify(user)));
          user.repos.fetch({
            remote: true,
            success: function (repos) {
              $('body').append($('<div>').text('Repos: ' +
                JSON.stringify(repos)));
              repos.each(function (repo) {
                repo.issues.fetch({
                  remote: true,
                  success: function (issues) {
                    $('body').append($('<div>').text('Issues for ' +
                      repo.get('name') + ': ' + JSON.stringify(issues)));
                  }
                });
              });
            }
          });
        },
        error: function (user, xhr) {
          $('body').text('Unable to fetch ' + login + '. Error: ' +
            xhr.data.message);
        }
      });
    }
  };

  // Run the `init` function once the DOM is ready, unless this is run from the
  // test runner.
  if (window.ENV !== 'test') $(app.init);
})();
