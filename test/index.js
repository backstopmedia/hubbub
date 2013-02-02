window.jQuery(function () {

  var _ = window._;
  var app = window.app;
  var test = window.test;
  var equal = window.equal;

  module('Hubbub');

  test('repo url is correct', function () {
    var repo = new app.Repo.Model({
      name: 'hubbub',
      owner: {login: 'backstopmedia'}
    });
    var url = 'https://api.github.com/repos/backstopmedia/hubbub';
    equal(_.result(repo, 'url'), url);
  });

  test('repo issues url is correct', function () {
    var repo = new app.Repo.Model({
      name: 'hubbub',
      owner: {login: 'backstopmedia'}
    });
    var url = 'https://api.github.com/repos/backstopmedia/hubbub/issues';
    equal(_.result(repo.issues, 'url'), url);
  });

  test('app.Repo.Collection.withOwner() should set the `url`', function () {
    var repos = app.Repo.Collection.withOwner('bob');
    equal(_.result(repos, 'url'), 'https://api.github.com/users/bob/repos');
  });

  test('adding a repo to the board should persist the repo', function () {
    var board = new app.Board.Model();
    var repo = new app.Repo.Model({
      id: 1,
      name: 'backbone',
      owner: {login: 'bob'}
    });
    board.repos.add(repo);

    var repos = app.Repo.Collection.withOwner('bob');
    repos.fetch();
    equal(repos.length, 1);
    repo.destroy();
    board.destroy();
  });
});
