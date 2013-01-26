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
    {"id": 10341232, "title": "trigger calls unbinded event handlers", "number": 2198, "repoId": 952189, "category": "default", "created_at": "2013-01-26T18:26:53Z"},
    {"id": 10339785, "title": "All Code refactoring", "number": 2196, "repoId": 952189, "category": "default", "created_at": "2013-01-26T16:29:40Z"},
    {"id": 10338616, "title": "Comparator and fat arrow", "number": 2195, "repoId": 952189, "category": "default", "created_at": "2013-01-26T14:35:16Z"},
    {"id": 10314836, "title": "Improve consistency: get rid of \"a zealous early error breaking apps in inconvenient ways\"", "number": 2191, "repoId": 952189, "category": "default", "created_at": "2013-01-25T15:34:55Z"},
    {"id": 10303321, "title": "collection.get(model) uses _byId[model.id] however id may be added after...", "number": 2189, "repoId": 952189, "category": "default", "created_at": "2013-01-25T08:23:20Z"},
    {"id": 10205547, "title": "options.context not being passed to success function in Backbone.sync ", "number": 2179, "repoId": 952189, "category": "done", "created_at": "2013-01-22T19:22:41Z"},
    {"id": 10172489, "title": "Reverting changes from #2003 and 1f3f45252f", "number": 2173, "repoId": 952189, "category": "default", "created_at": "2013-01-21T21:36:58Z"}
  ];

  module('Generic Tests', {
    setup: function () {
      // setup
    }
  });

  test('sort by title', function () {
    var issues = new app.Issue.Collection(testData);
    var sorted = issues.sortBy("title");
    equal(sorted[0].id, 10339785);
  });

});
