# Contributing Guidelines

This document describes the technologies, workflow, and coding standards you need to get familiar with before you start
contributing to this project.

## Technologies

### Git

In order for you to participate in our workflow efficiently, you need to have a good understanding of
how [git](https://git-scm.com/) works. If you feel like you have some gaps in this area, read at least the first three
chapters of [Pro Git](https://git-scm.com/book/en/v2) book which is available online for free.

### React

A basic understanding of [React](https://reactjs.org) and its [Hooks](https://reactjs.org/docs/hooks-intro.html) is required.

### Agoric

You should also be familiar with [Agoric](https://agoric.com/) SDK as well as hardened JavaScript environment called [SES](https://github.com/endojs/endo/tree/master/packages/ses#readme) in which all Agoric smart contracts and applications run.

## Workflow

### Branches

Most of the work in this repo is being done in the `main` branch which is also the default branch you can see when you
open this project on GitHub. You should always branch off the `main` branch whenever you start
working on something new.

### Commits

You should make a commit whenever you finish a small meaningful piece of work.
The library must be in a good shape before and after each commit.
This means the code needs to be able to pass the linter and build process.
Avoid large commits with many unrelated changes.

Make sure you write good commit messages that are both short and clearly describe what you have changed. If you are not
sure what a good commit message looks like,
read [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/) and try to follow every single rule
mentioned there.

We try to follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification so each commit should start with a prefix that identifies what kind of change has been made.
We use this information to release the right version of the library that follows [Semantic Versioning](https://semver.org/).

An example of a good commit message:

```
fix: reuse toast for connect notifications
```

### Pull Requests

Once you are happy with the result of your work, send a pull request from your feature branch to the `main` branch. Don't
forget to add one of the maintainers of this project as a reviewer.

#### Scope

A pull request should usually contain just a single commit. The only exception is when you make two different changes in
the app where the second one depends on the first one. In this case, it makes sense to have two commits in a pull
request.

Try to avoid sending large pull requests with more than a thousand lines of code changed. It is very hard to review such
huge pieces, and it is quite likely that some unwanted code will get merged to the code base.

#### CI Job

When you send a pull request, a CI job will be run automatically. It will check whether your code pass the linting rules
and whether a library can be built.

If it fails, look at what caused this failure and try to fix your code. Do not add new commits but amend the existing
ones instead. Nobody is interested in partial fixes you made once your code gets merged to the `main` branch.

#### Merging

If you are a maintainer of this project, and you are happy with the changes made in the pull request, you can merge it.
Try to use `Rebase and merge` option instead of the default `Merge pull request` option. This way, there will be no
merge commit made in the `main` branch and commit history will be cleaner and easier to browse.

Or use `Squash and merge` option if a contributor broke the rules described in the previous paragraphs and created
unnecessary fix commits or wrote a bad commit message.

### Versioning

Whenever you make a change which needs to be published to the npm registry (basically everything except for documentation and CI configuration changes), run the following command before making a commit:

```
yarn changeset
```

You need to select which packages will be published, what version change will be made (major, minor, or bugfix) and write a short summary of this release.
A new Markdown file will be created in the `.changeset` folder.
You need to add this file to your commit.

Once your pull request is merged, a CI job will look at this file and create another pull request with a version update.
When this new pull request is merged, the CI job will publish a new version of a package.

## Improvements

This is a living document and nothing written here is set in stone. If you find any outdated information, or you simply
don't agree with something, communicate your suggestions how to improve this document to the maintainers of this
project.
