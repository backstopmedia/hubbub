(function () {
  'use strict';

  var $ = window.jQuery;
  var _ = window._;
  var Backbone = window.Backbone;
  var app = window.app;

  var searchRegex = /^(\w+)(?:\/([\w.\-]+))?$/;
  var resultsTemplate = _.template($('#js-search-results-template').html());

  app.RepoSearchView = Backbone.View.extend({
    events: {
      'submit .js-repo-search-form': 'search',
      'click .js-repo-result': 'searchResultClicked'
    },

    search: function () {
      var val = this.$('#js-repo-search-input').val();
      var match = val.match(searchRegex);
      if (!match) {
        this.message('Please enter a valid user or user/repo combo.', 'error');
        return false;

        // If there was a match in the second capture group, the entry is for
        // a repo.
      } else if (match[2]) {
        var repo = new app.Repo.Model({
          name: match[2],
          owner: {login: match[1]}
        });
        this.addRepo(repo);

        // Without a second capture group, the user must be searching for a
        // GitHub user.
      } else {
        var repos = app.Repo.Collection.withOwner(match[1]);
        this.fetchRepos(repos);
      }
      this.$('#js-repo-search-input').val('');
      return false;
    },

    searchResultClicked: function (ev) {
      var repoId = $(ev.target).attr('data-repo-id');
      var repo = this.repos.get(repoId);
      this.addRepo(repo);
    },

    // Find repos for the given repo collection and display them.
    fetchRepos: function (repos) {
      this.message('Fetching repos...', 'pending');
      var self = this;
      repos.fetch({
        remote: true,
        success: function (repos) {
          self.repos = repos;
          self.message("Succesfully Retrieved Repos", 'success');
          self.$('#js-repo-search-list')
            .removeClass('empty')
            .html(resultsTemplate({repos: repos}));
        },
        error: _.bind(this.syncError, this)
      });
    },

    message: function (message, type) {
      var $box = this.$('#js-message').removeClass('alert-error alert-success');
      if (type) $box.addClass('alert-' + type);
      if (message) return $box.html(message).removeClass('empty');
      $box.addClass('empty');
    },

    addRepo: function (repo) {
      this.message('Fetching repo...', 'pending');
      this.$('#js-repo-search-list').addClass('empty');
      var self = this;
      repo.fetch({
        remote: true,

        // If we successfully fetched the repo, add it to the user's repo list
        // and save.
        success: function () {
          self.message('Repo found, fetching issues...', 'pending');
          repo.issues.fetch({
            remote: true,
            success: function () {
              app.board.repos.add(repo);
              self.message();
            },
            error: function (model, xhr) {
              repo.destroy();
              self.syncError(model, xhr);
            }
          });
        },

        // Display an error if one occurs.
        error: _.bind(this.syncError, this)
      });
    },

    syncError: function (model, xhr) {
      this.message(xhr.status + ' ' + xhr.data.message, 'error');
    }
  });
})();
