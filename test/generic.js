window.jQuery(function () {

  var module = window.module;
  var _ = window._;
  var app = window.app;
  var ok = window.ok;
  var test = window.test;
  var equal = window.equal;
  var deepEqual = window.deepEqual;

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
    {"id": 10338616, "title": "Comparator and fat arrow", "number": 2195, "repoId": 952189, "category": "doing", "comments": 5, "created_at": "2013-01-26T14:35:16Z"},
    {"id": 10341232, "title": "trigger calls unbinded event handlers", "number": 2198, "repoId": 952189, "category": "todo", "comments": 21, "created_at": "2013-01-26T18:26:53Z"},
    {"id": 10339785, "title": "All Code refactoring", "number": 2196, "repoId": 952189, "category": "doing", "comments": 1, "created_at": "2013-01-26T16:29:40Z"},
    {"id": 10172489, "title": "Reverting changes from #2003 and 1f3f45252f", "number": 2173, "repoId": 952189, "category": "done", "comments": 3, "created_at": "2013-01-21T21:36:58Z"}
  ];

  module('Generic Tests', {
    setup: function () {
      // setup
    }
  });

  test('collection: sort by title', function () {
    var issues = new app.Issue.Collection(testData);
    equal(issues.at(0).get("title"), "trigger calls unbinded event handlers"); // This is the first item before sorting
    var sorted = issues.sortBy("title");
    equal(sorted[0].get("title"), "All Code refactoring");  // After sorting this item is first
  });

  test('collection: sort by longest title', function () {
    var issues = new app.Issue.Collection(testData);
    var sorted = issues.sortBy(function(issue) {
      return -1 * issue.get("title").length;
    });
    equal(sorted[0].get("title"), "Reverting changes from #2003 and 1f3f45252f");  // After sorting this item is first
  });

  test('collection: filter by title contains "event"', function () {
    var issues = new app.Issue.Collection(testData);
    var filtered = issues.filter(function(issue) {
      return issue.get("title").indexOf("event") !== -1;
    });
    equal(filtered.length, 1); // Only one model found
    equal(filtered[0].id, 10341232);  // Confirm correct model is returned
  });

  test('collection: map & pluck', function () {
    var issues = new app.Issue.Collection(testData);
    var mapped = issues.map(function(issue) {
      return issue.get("number");
    });
    var plucked = issues.pluck("number");
    equal(plucked.toString(), mapped.toString()); // Mapped and plucked arrays should be the same
    equal(plucked.length, 4); // Should have 4 values
    equal(plucked[0], issues.at(0).get("number")); // First value should be equal to the number property of the first model
  });

  test('collection: some', function () {
    var issues = new app.Issue.Collection(testData);
    var hasToDoIssues = issues.some(function(issue) {
      return issue.get("category") === "todo";
    });
    var hasRejectedIssues = issues.some(function(issue) {
      return issue.get("category") === "rejected";
    });
    equal(hasToDoIssues, true);  // This variable should be true as there are issues with a todo category
    equal(hasRejectedIssues, false);  // This variable should be false as there are no issues with a rejected category
  });

  test('collection: reduce', function () {
    var issues = new app.Issue.Collection(testData);
    var reduceIterator = function(sum, issue) {
      return sum + issue.get("comments");
    };
    var numberOfComments = issues.reduce(reduceIterator, 0); // We pass an iterator function and the starting "memo" value
    equal(numberOfComments, 30);  // The total number of comments from all the issues.
  });

  test('collection: max & min', function () {
    var issues = new app.Issue.Collection(testData);
    var iterator = function(issue) {
      return issue.get("comments");
    };
    var mostCommentsIssue = issues.max(iterator);  // We can use the same iterator for both the min and max methods
    var leastCommentsIssue = issues.min(iterator);
    equal(mostCommentsIssue.id, 10341232);
    equal(leastCommentsIssue.id, 10339785);
  });

  test('collection: groupBy & countBy', function () {
    var issues = new app.Issue.Collection(testData);
    var iterator = function(issue) {
      return issue.get("category");
    };
    var grouped = issues.groupBy(iterator);
    var counts = issues.countBy(iterator);
    deepEqual({
      done:1,
      doing:2,
      todo:1
    }, counts);
    equal(counts.doing, grouped.doing.length);
  });

  test('collection: setFilter meothd', function () {
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
