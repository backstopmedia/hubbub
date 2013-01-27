window.jQuery(function () {

  var module = window.module;
  var _ = window._;
  var app = window.app;
  var ok = window.ok;
  var test = window.test;
  var equal = window.equal;
  /* Test Data Generator:
   JSON.stringify(app.board.issues.map(function(a){
     return {
       id:a.id,
       title:a.get("title"),
       number:a.get("number"),
       repoId: a.repo.id,
       category: a.get("category"),
       created_at:a.get("created_at")
     };
   }));
   */
  var testData = [
    {"id": 10338616, "title": "Comparator and fat arrow", "number": 2195, "repoId": 952189, "category": "doing", "created_at": "2013-01-26T14:35:16Z"},
    {"id": 10341232, "title": "trigger calls unbinded event handlers", "number": 2198, "repoId": 952189, "category": "todo", "created_at": "2013-01-26T18:26:53Z"},
    {"id": 10339785, "title": "All Code refactoring", "number": 2196, "repoId": 952189, "category": "doing", "created_at": "2013-01-26T16:29:40Z"},
    {"id": 10172489, "title": "Reverting changes from #2003 and 1f3f45252f", "number": 2173, "repoId": 952189, "category": "done", "created_at": "2013-01-21T21:36:58Z"}
  ];

  module('Generic Tests', {
    setup: function () {
      // setup
    }
  });

  test('sort by title', function () {
    var issues = new app.Issue.Collection(testData);
    equal(issues.at(0).get("title"), "trigger calls unbinded event handlers"); // This is the first item before sorting
    var sorted = issues.sortBy("title");
    equal(sorted[0].get("title"), "All Code refactoring");  // After sorting this item is first
  });

  test('sort by longest title', function () {
    var issues = new app.Issue.Collection(testData);
    var sorted = issues.sortBy(function(issue) {
      return -1 * issue.get("title").length;
    });
    equal(sorted[0].get("title"), "Reverting changes from #2003 and 1f3f45252f");  // After sorting this item is first
  });

  test('filter by title contains "event"', function () {
    var issues = new app.Issue.Collection(testData);
    var filtered = issues.filter(function(issue) {
      return issue.get("title").indexOf("event") !== -1;
    });
    equal(filtered.length, 1); // Only one model found
    equal(filtered[0].id, 10341232);  // Confirm correct model is returned
  });

  test('map & pluck', function () {
    var issues = new app.Issue.Collection(testData);
    var mapped = issues.map(function(issue) {
      return issue.get("number");
    });
    var plucked = issues.pluck("number");
    equal(plucked.toString(), mapped.toString()); // Mapped and plucked arrays should be the same
    equal(plucked.length, 4); // Should have 4 values
    equal(plucked[0], issues.at(0).get("number")); // First value should be equal to the number property of the first model
  });

});
