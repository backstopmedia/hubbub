window.jQuery(function () {

  var app = window.app;
  var ok = window.ok;
  var test = window.test;

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
});
