window.jQuery(function () {

  var app = window.app;
  var ok = window.ok;
  var test = window.test;

  // Clear localStorage for the test.
  window.localStorage.clear();

  test('saving a new issue assigns an ID', function () {
    var issue = new app.Issue();
    issue.on('change:id', function () { ok(true); });
    issue.save();
  });

  test('retrieving a recently saved issue through a collection', function () {
    var issues = new app.Issue.Collection();
    issues.fetch();
    ok(issues.length);
  });

  test('deleting issues leaves an empty object in localStorage', function () {
    var issues = new app.Issue.Collection();
    issues.fetch();
    issues.each(function (issue) { issue.destroy(); });
    ok(issues.length === 0);
    issues.fetch();
    ok(issues.length === 0);
  });
});
