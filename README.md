# Jest Skip
This package extends Jest's functionality by allowing dynamic skipping of tests during test execution.

## Overview

There are instances when we may need to skip a test based on certain conditions. For example, if the environment isn't properly set up or if other tests have failed. While Jest doesn't support this feature natively, this utility provides the functionality.

This utility addresses the issue by:
* Including a custom test environment that marks tests as skipped when necessary.
* Providing `skip()` and `skipIf()` functions that can be used to skip tests.

## Disclaimer

The [`jest-circus` documentation](https://github.com/jestjs/jest/tree/main/packages/jest-circus#overview) explicitly states that mutating the state data by the environment is unsupported. This utility does exactly that, so it may not work in some cases or could break in the future.

Use at your own risk!

In practice, Jest seems to handle such mutations well, especially those performed by this utility. Therefore, it should work for you too. However, if something doesn't work, feel free to raise an issue!

## Usage

### Installation

Install using npm or your preferred package manager, e.g.:

`npm install --save-dev @sbnc/jest-skip`

### Configuration

#### Prerequisite

Ensure you understand what a [Jest Environment](https://jestjs.io/docs/configuration#testenvironment-string) is and how to use it.

As this utility replaces the Jest Environment, you need to configure it in your Jest configuration file or in your test files.

Since we're replacing the Jest Environment, it limits your ability to freely choose your Environment. This utility supports the most common environments:

- `node`: `@sbnc/jest-skip/node`
- `jsdom`: `@sbnc/jest-skip/jsdom`

If you want to use it with a different environment, such as [`@happy-dom/jest-environment`](https://www.npmjs.com/package/@happy-dom/jest-environment), please raise an issue or a pull request.

#### CLI

Specify the environment as a CLI argument for the Jest command:

`jest --env=@sbnc/jest-skip/node`


#### In `package.json`

To configure for all tests, add the following to your `package.json` file:

```json
{
    "jest": {
        "testEnvironment": "@sbnc/jest-skip/node"
    }
}
```

#### Jest configuration file

Add the following to your `jest.config.js` file to configure for all tests:

```js
module.exports = {
  // ...
  testEnvironment: '@sbnc/jest-skip/node',
  // ...
}
```

Or if you are using `json`:
```json
{
  "testEnvironment": "@sbnc/jest-skip/node"
}
```

#### Test file

To use it in certain test files only, add the following to your test file:

```js
/**
 * @jest-environment @sbnc/jest-skip/node
 */
```

## Skipping tests

### `skip()`

This method unconditionally skips a test. It can be used on its own or within custom logic.

```js
import { skip } from '@sbnc/jest-skip';

test('skipped test', () => {
  skip();
  expect(true).toBe(false); // This will not be executed, the test will not raise an error.
});
```

### `skipIf()`

This method skips a test if the condition is met. It can be used on its own or within custom logic.

```js
import { skipIf } from '@sbnc/jest-skip';

test('test only when someCondition is not true', () => {
  skipIf(someCondition);
  expect(true).toBe(false); // This will be executed and the test will not raise an error if someCondition is falsey.
});
```

### CJS vs ESM support

The environments are packaged in only CJS format, as Jest is still a CJS application. Currently, there are no use-cases where the environment should be in ESM format.

The utilities are shipped in both CJS and ESM formats. So, besides the examples above,
```js
const { skip, skipIf } = require('@sbnc/jest-skip');
```
is also valid.


***

Bence Szalai - https://sbnc.eu/
