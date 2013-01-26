(function () {
  'use strict';

  var $ = window.jQuery;
  var _ = window._;
  var app = window.app;

  var addRe = /^(\w+)(?:\/([\w.\-]+))?$/;
  var resultsTemplate = _.template($('#js-search-results-template').html());

  app.SidebarView = app.View.extend({
    template: _.template($('#js-sidebar-template').html()),

    id: 'js-sidebar',
    className: 'span2',

    events: {
      // repo searching
      'click #js-add-button': 'search',
      'keydown #js-add-input': 'search',
      'click .js-repo-result': 'searchResultClicked',

      // fitlering
      'change input[name="repoFilter"]': 'filterRepos'
    },

    initialize: function () {
      // re-render sidebar when repos are added/removed
      this.listenTo(app.board.repos, 'add remove', _.debounce(this.render));
    },

    render: function(){
      this.$el.html(this.template({repos:this.collection}));
      // cache the filters
      this.$repoFilters = this.$('input[name="repoFilter"]');
      return this;
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

    searchResultClicked: function (ev) {
      var repoId = $(ev.target).attr('data-repo-id');
      var repo = this.repos.get(repoId);
      this.addRepo(repo);
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
          self.$('#js-repo-search-list')
            .removeClass('empty')
            .html(resultsTemplate({repos: repos}));
        },
        error: _.bind(this.syncError, this)
      });
    },

    filterRepos: function(){
      this.$repoFilters.each(function(){
        var $input = $(this);
        var issues = app.board.repos.get($input.val()).issues.models;
        if ($input.is(':checked')){
          app.board.filteredIssues.add(issues);
        } else {
          app.board.filteredIssues.remove(issues);
        }
      });
    },

    message: function (message, type) {
      var $box = this.$('#js-message').removeClass('alert-error alert-success');
      if (type) $box.addClass('alert-' + type);
      $box.html(message);
      $box.removeClass('empty');
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

    syncError: function (__, xhr) {
      this.message(xhr.status + ' ' + xhr.data.message, 'error');
    }
  });
})();
