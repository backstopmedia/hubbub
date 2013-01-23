window.jQuery(function () {

  var _ = window._;
  var app = window.app;
  var ok = window.ok;
  var test = window.test;
  var equal = window.equal;

  // Clear localStorage for the test.
  window.localStorage.clear();

  test('saving a new user assigns an ID', function () {
    var user = new app.User();
    user.on('change:id', function () { ok(true); });
    user.save();
  });

  test('retrieving a recently saved user through a collection', function () {
    var users = new app.User.Collection();
    users.fetch();
    ok(users.length);
  });

  test('deleting users leaves an empty object in localStorage', function () {
    var users = new app.User.Collection();
    users.fetch();
    users.each(function (user) { user.destroy(); });
    ok(users.length === 0);
    users.fetch();
    ok(users.length === 0);
  });

  test('user url is correct', function () {
    var user = new app.User({login: 'backstopmedia'});
    var url = 'https://api.github.com/users/backstopmedia';
    equal(_.result(user, 'url'), url);
  });

  test('repo url is correct', function () {
    var repo = new app.Repo({
      name: 'backbone',
      owner: {login: 'backstopmedia'}
    });
    var url = 'https://api.github.com/repos/backstopmedia/backbone';
    equal(_.result(repo, 'url'), url);
  });

  test('repo issues url is correct', function () {
    var repo = new app.Repo({
      name: 'backbone',
      owner: {login: 'backstopmedia'}
    });
    var url = 'https://api.github.com/repos/backstopmedia/backbone/issues';
    equal(_.result(repo.issues, 'url'), url);
  });

  test('repo should have an owner/name style displayName', function () {
    var repo = new app.Repo({
      name: 'backbone',
      owner: {login: 'backstopmedia'}
    });
    equal(repo.displayName(), 'backstopmedia/backbone');
  });
});
