<h1 align="center">
  <img src='https://raw.githubusercontent.com/americanexpress/create-shared-react-context/master/create-shared-react-context.png' alt="Create Shared React Context - One Amex" width='50%'/>
</h1>

> A memoized wrapper around React.createContext. Used by [One App](https://github.com/americanexpress/one-app) as a dependency to pass React context between [Holocron modules](https://github.com/americanexpress/holocron/tree/master/packages/holocron) without external usage.

[![npm version](https://badge.fury.io/js/create-shared-react-context.svg)](https://badge.fury.io/js/create-shared-react-context)
[![Build Status](https://travis-ci.org/americanexpress/create-shared-react-context.svg?branch=master)](https://travis-ci.org/americanexpress/create-shared-react-context)
[![Coverage Status](https://coveralls.io/repos/americanexpress/create-shared-react-context/badge.svg?branch=master&service=github)](https://coveralls.io/github/americanexpress/create-shared-react-context?branch=master)

## 👩‍💻 Hiring 👨‍💻

Want to get paid for your contributions to `create-shared-react-context`?
> Send your resume to oneamex.careers@aexp.com

## 📖 Table of Contents

* [Features](#Features)
* [Usage](#Usage)
* [API](#API)
* [Git Hooks](#Git%20Hooks)
* [Contributing](#Contributing)

<br />

## ✨ Features

* Memoized wrapper around React.createContext

<br />


## 🤹‍ Usage

### Installing

```bash
$ npm install --save create-shared-react-context
```

### Example

```js
import createSharedReactContext from 'create-shared-react-context';

const context = createSharedReactContext({}, 'someIdentifier');

```

## 🎛️ API
`createSharedReactContext` takes two arguments: `defaultValue` and `key`.

`defaultValue` is the same default value that would be used in `createContext`.

`key` is the identifier used to ensure that any subsequent call of `createSharedReactContext`
will return any previous created context with the same identifier.

### Motivation

In a modular application, sharing functionality between bundled modules with their own dependencies
can be done in a myriad of ways. If one wanted to be able to pass functionality using React 
Context, but each module has their own instance of the dependency creating that context, the
Provider used at the top would fail to pass context down to the Consumer, as the reference would
be different. You could declare that dependency as an external, so that the reference used by each
module would be shared, but sometimes a dependency may not require a separate instance to function.

<br />

## 🎣 Git Hooks

These commands will be automatically run during normal git operations like committing code.

**`pre-commit`**

This hook runs `npm test` before allowing a commit to be checked in.

**`commit-msg`**

This hook verifies that your commit message matches the One Amex conventions. See the **commit
message** section in the [contribution guidelines](https://github.com/americanexpress/create-shared-react-context/blob/master/CONTRIBUTING.md).

<br />

## 🏆 Contributing

See [contributing guidelines](https://github.com/americanexpress/create-shared-react-context/blob/master/CONTRIBUTING.md)

<br />

## 🗝️ License

Any contributions made under this project will be governed by the [Apache License 2.0](https://github.com/americanexpress/create-shared-react-context/blob/master/LICENSE.txt).

<br />

## 🗣️ Code of Conduct

This project adheres to the [American Express Community Guidelines](https://github.com/americanexpress/create-shared-react-context/blob/master/CODE_OF_CONDUCT.md).
By participating, you are expected to honor these guidelines.
