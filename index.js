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
      app.board = new app.Board.Model({id: 1});

      // retrieve previously saved data from localhost
      app.board.fetch();

      this.mainView = new app.MainView();
      this.mainView.render();
      $('#app-container').append(this.mainView.el);

      app.router = new app.Router({
        mainView: this.mainView
      });
      Backbone.history.start();

      // Only show the welcome modal if the user hasn't opted out of it. This
      // ensures the welcome message will always be shown at least once, and
      // multiple times for those who don't want to hide it.
      if (app.board.get('showWelcome')) {
        this.mainView.showWelcomeModal();
      }
    }
  };

  // Run the `init` function once the DOM is ready, unless this is run from the
  // test runner.
  if (window.ENV !== 'test') $(app.init);
})();
