Backstop Media - Backbone.js
============================

[View Demo Page](http://backstopmedia.github.com/backbone)

[View Test Suite](http://backstopmedia.github.com/backbone/test)

API
---

### Models

#### app.User

A user model that can be mapped to a GitHub user. Each `user` also has a `repos`
collection property.

```js
var backstopmedia = new app.User({login: 'backstopmedia'});

// Fetch public information for this user.
backstopmedia.fetch({
  remote: true, // fetch from GitHub, not localStorage
  success: function () {
    console.log(backstopmedia.attributes);
  }
});

// Fetch all of the repos for this user.
backstopmedia.repos.fetch({
  remote: true,
  success: function (repos) {
    console.log(repos.pluck('name'));
  }
});
```

#### app.Org

An org model that has an identical API to `app.User`.

#### app.Repo

A repo model that can be mapped to a GitHub repo. Each `repo` also has an
`issues` collection property.

```js
var backbone = new app.Repo({
  name: 'backbone',
  owner: {login: 'backstopmedia'}
});

// Fetch public information for this repo.
backbone.fetch({
  remote: true,
  success: function () {
    console.log(backbone.attributes);
  }
});

// Fetch all of the issues for this repo.
backbone.issues.fetch({
  remote: true,
  success: function (issues) {
    console.log(issues.pluck('title'));
  }
});
```

#### app.Issue

An issue model that can be mapped to a GitHub issue. These should be fetched
from a `repo` model rather than instatiated on their own.
