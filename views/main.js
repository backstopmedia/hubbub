(function () {
  'use strict';

  var $ = window.jQuery;
  var _ = window._;
  var app = window.app;

  var addRe = /^(\w+)(?:\/([\w.\-]+))?$/;

  app.MainView = app.View.extend({
    events: {
      'click #js-add-button': 'search',
      'keydown #js-add-input': 'search'
    },

    search: function (ev) {

      // Check for the enter key (keycode 13) if this is a keydown event.
      if (ev.type === 'keydown' && ev.which !== 13) return;

      var val = this.$('#js-add-input').val();
      var match = val.match(addRe);
      if (!match) {
        this.message('Please enter a valid user or user/repo combo.', 'error');

      // If there was a match in the second capture group, the entry is for
      // a repo.
      } else if (match[2]) {
        var repo = new app.Repo({name: match[2], owner: {login: match[1]}});
        this.addRepo(repo);

      // Without a second capture group, the user must be searching for a
      // GitHub user.
      } else {
        var user = new app.User({login: match[1]});
        this.findReposFor(user);
      }
    },

    addRepo: function (repo) {
      this.message('Fetching...', 'pending');
      var self = this;
      repo.fetch({
        remote: true,

        // If we successfully fetched the repo, add it to the user's repo list
        // and save.
        success: function () {
          app.board.repos.add(repo);
          self.message('Added:<br>' + JSON.stringify(repo), 'success');
        },

        // Display an error if one occurs.
        error: function (repo, xhr) {
          self.error(xhr.status + ' ' + xhr.data.message, 'error');
        }
      });
    },

    message: function (message, type) {
      var $box = this.$('#js-message').removeClass('js-error js-success');
      if (type) $box.addClass('js-' + type);
      $box.html(message);
    },

    // Find repos for the given user and display them.
    findReposFor: function (user) {
      this.message('Fetching...', 'pending');
      var self = this;
      user.repos.fetch({
        remote: true,
        success: function (repos) {
          var message = 'Found:<br>' + repos.invoke('displayName').join('<br>');
          self.message(message, 'success');
        },
        error: function (repos, xhr) {
          self.message(xhr.status + ' ' + xhr.data.message, 'error');
        }
      });
    },

    render: function () {
      this.$el.html(_.template($('#js-main-view-template').html(), {}));
      return this;
    }
  });
})();
