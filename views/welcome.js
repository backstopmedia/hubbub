(function () {
  'use strict';

  var $ = window.jQuery;
  var _ = window._;
  var app = window.app;

  var addRe = /^(\w+)(?:\/([\w.\-]+))?$/;

  app.WelcomeView = app.View.extend({

    template: _.template($('#js-welcome-template').html()),

    resultsTemplate: _.template($('#js-search-results-template').html()),

    className: "row-fluid",

    events: {
      'click #js-add-button': 'search',
      'keydown #js-add-input': 'search',
      'click .js-repo-result': 'repoClicked',
      'click .js-repo-remove' : 'removeRepo'
    },

    search: function (ev) {
      // Check for the enter key (keycode 13) if this is a keydown event.
      if (ev.type === 'keydown' && ev.which !== 13) return;
      ev.preventDefault();

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

    removeRepo: function (ev) {
      var repoId = $(ev.target).attr('data-repo-id');
      var repo = app.board.repos.get(repoId);
      app.board.repos.remove(repo);
      app.board.save();
    },

    repoClicked: function (ev) {
      var repoId = $(ev.target).attr('data-repo-id');
      var repo = this.repos.get(repoId);
      this.addRepo(repo);
    },

    addRepo: function (repo) {
      this.message('Fetching repo...', 'pending');
      var self = this;
      repo.fetch({
        remote: true,

        // If we successfully fetched the repo, add it to the user's repo list
        // and save.
        success: function () {
          app.board.repos.add(repo);
          self.message('Repo found, fetching issues...', 'pending');
          repo.issues.fetch({
            update: true,
            remote: true,
            success: function () {
              app.board.save();
              self.message('Added: ' + repo.displayName(), 'success');
            },
            error: function (__, xhr) {
              app.board.repos.remove(repo);
              self.syncError(__, xhr);
            }
          });
        },

        // Display an error if one occurs.
        error: _.bind(this.syncError, this)
      });
    },

    message: function (message, type) {
      var $box = this.$('#js-message').removeClass('alert-error alert-success');
      if (type) $box.addClass('alert-' + type);
      $box.html(message);
    },

    // Find repos for the given user and display them.
    findReposFor: function (user) {
      this.message('Fetching user...', 'pending');
      var self = this;
      user.repos.fetch({
        remote: true,
        success: function (repos) {
          // TODO use events on this collection for rendering
          self.repos = repos;
          self.message("Succesfully Retrieved Repos", 'success');
          self.$('#js-repo-search-list').html(self.resultsTemplate({repos: repos}));
        },
        error: _.bind(this.syncError, this)
      });
    },

    render: function () {
      this.$el.html(this.template());

      this.yourRepoView = new app.RepoListView({collection:app.board.repos});
      this.$('#js-your-repo-list').append(this.yourRepoView.render().el);

      // setup child views
      //var sidebarView = new app.SidebarView();
      //sidebarView.render();
      //this.$el.append(sidebarView.$el);

      // TODO split into categories
      //var issuesView = new app.IssueListView({collection: app.board.issues});
      //issuesView.render();
      //this.$el.append(issuesView.$el);
      return this;
    },

    syncError: function (__, xhr) {
      this.message(xhr.status + ' ' + xhr.data.message, 'error');
    },

    remove: function() {
      this.yourRepoView.remove();
      return app.View.prototype.remove.call(this);
    }
  });
})();
