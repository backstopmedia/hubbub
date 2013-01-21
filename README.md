Backstop Media - Backbone.js
============================

[View Demo Page](http://backstopmedia.github.com/backbone)

[View Test Suite](http://backstopmedia.github.com/backbone/test)

Example
-------

```js
// Fetch the org info for `login` 'backstopmedia'.
var org = new app.Org({login: 'backstopmedia'});
org.fetch({
  remote: true,
  success: function () {
    console.log(org.attributes);

    // Fetch all of the `repos` for 'backstopmedia'.
    org.repos.fetch({
      remote: true,
      success: function (repos) {
        console.log(repos.models);

        // Fetch the issues for the 'backbone' repo.
        repos.where({name: 'backbone'})[0].issues.fetch({
          remote: true,
          success: function(issues) {

            // Winning.
            console.log(issues.models);
          }
        });
      }
    });
  }
});
```
