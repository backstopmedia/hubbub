Hubbub
======

Issues get messy, Hubbub keeps you organized.

[Demo](http://backstopmedia.github.com/hubbub) • [Test Suite](http://backstopmedia.github.com/hubbub/test)

API
---

### Models

#### app.Board

A board holds all of the information pertinent to the kanban. `app.board` is
defined during the app's initialization and should be used for adding and
removing user repos and preferences.

#### app.Repo

A repo model that can be mapped to a GitHub repo. Each `repo` also has an
`issues` collection property.

```js
var hubbub = new app.Repo.Model({
  name: 'hubbub',
  owner: {login: 'backstopmedia'}
});

// Fetch public information for this repo.
hubbub.fetch({
  remote: true,
  success: function () {
    console.log(hubbub.attributes);
  }
});

// Fetch all of the issues for this repo.
hubbub.issues.fetch({
  remote: true,
  success: function (issues) {
    console.log(issues.pluck('title'));
  }
});

// Fetch all repos for a given login
var repos = app.Repo.Collection.withOwner('backstopmedia');
repos.fetch({
  remote: true,
  success: function () {
    console.log(repos.pluck('name'));
  }
})
```

#### app.Issue

An issue model that can be mapped to a GitHub issue. These should be fetched
from a `repo` model rather than instatiated on their own.
