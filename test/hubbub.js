window.jQuery(function () {

  var _ = window._;
  var app = window.app;
  var test = window.test;
  var equal = window.equal;

  module('Hubbub');

  test('repo url is correct', function () {
    var repo = new app.Repo.Model({
      full_name: 'backstopmedia/hubbub',
      name: 'hubbub',
      owner: {login: 'backstopmedia'}
    });
    equal(_.result(repo, 'url'), 'https://api.github.com/repos/backstopmedia/hubbub');
  });

  test('repo issues url is correct', function () {
    var repo = new app.Repo.Model({
      full_name: 'backstopmedia/hubbub',
      name: 'hubbub',
      owner: {login: 'backstopmedia'}
    });
    equal(_.result(repo.issues, 'url'), 'https://api.github.com/repos/backstopmedia/hubbub/issues');
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

  asyncTest('repos remote fetch works', function () {
    var repo = new app.Repo.Model({
      id: 1,
      name: 'hubbub',
      full_name:'backstopmedia/hubbub',
      owner: {login: 'backstopmedia'}
    });
    repo.fetch({
      remote:true,
      success: function() {
        ok(repo.has('archive_url'));
        start();
      }
    });
  });

  test('repos toBoard method products correct data', function () {
    var repo = new app.Repo.Model({
      id: 1,
      name: 'hubbub',
      full_name:'backstopmedia/hubbub',
      owner: {login: 'backstopmedia'}
    });
    deepEqual(repo.toBoard(), {
      id: 1,
      name: 'hubbub',
      owner: {login: 'backstopmedia'}
    });
  });

  test('collection: setFilter method', function () {
    var testData = [
      {"id": 10338616, "title": "Comparator and fat arrow", "number": 2195, "repoId": 952189, "category": "doing", "comments": 5, "created_at": "2013-01-26T14:35:16Z"},
      {"id": 10341232, "title": "trigger calls unbinded event handlers", "number": 2198, "repoId": 952189, "category": "todo", "comments": 21, "created_at": "2013-01-26T18:26:53Z"},
      {"id": 10339785, "title": "All Code refactoring", "number": 2196, "repoId": 952189, "category": "doing", "comments": 1, "created_at": "2013-01-26T16:29:40Z"},
      {"id": 10172489, "title": "Reverting changes from #2003 and 1f3f45252f", "number": 2173, "repoId": 952189, "category": "done", "comments": 3, "created_at": "2013-01-21T21:36:58Z"}
    ];

    var issues = new app.Issue.Collection(testData);
    var done = new app.Issue.Collection();
    done.setFilter(issues, "category", "done");

    equal(done.length, 1); // Contains just the one model with a done category
    issues.get(10172489).set("category","doing");
    equal(done.length, 0); // Contains no models as the one model with a 'done' key  had its category changed to doing
    issues.invoke("set", "category", "done");
    equal(done.length, 4); // All 4 models are now, in the done collection
  });

});
