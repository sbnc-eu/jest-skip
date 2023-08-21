# Jest Skip
Add the ability to Jest to dynamically skip tests during the test execution.

## Explanation

Sometimes we want to skip a test based on some condition. For example, we may want to skip a test if the environment is not set up properly or if some other tests have failed. This is not possible with Jest out of the box, but this utility adds this functionality.

This small utility attempts to solve that problem in the following way:
* it includes a custom test environment which marks tests as skipped when needed
* it includes a `skip()` and a `skipIf()` function which can be used to skip tests

## Disclaimer

The [`jest-circus` documentation](https://github.com/jestjs/jest/tree/main/packages/jest-circus#overview) explicitly says that mutating the state data by the environment is not supported. This utility does exactly that, so it may break in the future or not work at all in some cases.

Use it at your own risk!

In reality Jest seems to be perfectly fine with such mutations, or at least the kind of mutations this utility does, so it will most probably work for you too. Indeed, if something does not work, feel free to raise an issue!

## Usage

### Installation

Install using e.g. npm:

`npm install --save-dev @sbnc/jest-skip`

... or your choice of package manager.

### Configuration

#### Prerequisite

Please make sure you understand what a [Jest Environment](https://jestjs.io/docs/configuration#testenvironment-string) is and how to use it.

Since this utility is a Jest Environment replacement, you need to set it up in your Jest configuration file or in your test files.

Now since we are replacing the Jest Environment this eliminates your ability to choose your Environment freely. This utility supports the most common environments:

- `node`: `@sbnc/jest-skip/node`
- `jsdom`: `@sbnc/jest-skip/jsdom`

If you'd like to use it with a different environment, such as [`@happy-dom/jest-environment`](https://www.npmjs.com/package/@happy-dom/jest-environment), please raise an issue or a pull request.


#### CLI

Specify the environment as a CLI argument for the Jest command:

`jest --env=@sbnc/jest-skip/node`


#### In `package.json`

Add the following to your `package.json` file to configure for all tests:

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
  "testEnvironment": "@happy-dom/jest-environment"
}
```

#### Test file

Add the following to your test file to only use it in certain test files:

```js
/**
 * @jest-environment @sbnc/jest-skip/node
 */
```

## Skipping tests

### `skip()`

This method skips a test unconditionally. It can be used on its own or inside custom logic.

```js
import { skip } from '@sbnc/jest-skip';

test('skipped test', () => {
  skip();
  expect(true).toBe(false); // This will not be executed, the test will not raise an error.
});
```

### `skipIf()`

This method skips a test if the condition is met. It can be used on its own or inside custom logic.

```js
import { skipIf } from '@sbnc/jest-skip';

test('test only when someCondition is not true', () => {
  skipIf(someCondition);
  expect(true).toBe(false); // This will be executed and the test will not raise an error if someCondition is falsey.
});
```

### CJS vs ESM support

The environments are packaged in only CJS format, since Jest is still a CJS application, and currently I know of no use-cases where the environment should be in ESM format.

The utilities are shipped in both CJS and ESM formats, so beside the examples above
```js
const { skip, skipIf } = require('@sbnc/jest-skip');
```
is also valid.


***

Bence Szalai - https://sbnc.eu/
