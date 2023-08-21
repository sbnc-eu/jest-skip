
/**
 * Throw this error anywhere during the tests to indicate that it should be considered Skipped.
 */
export class SkipTest extends Error {
  constructor ( message: string ) {
    super(message)
    this.name = 'SkipTest'
  }
}

/**
 * Call this method anywhere during the tests to indicate that it should be considered Skipped.
 * @param [message] Optional message to add to the test run output after the test name.
 */
export function skip ( message: string = '' ) {
  throw new SkipTest(message)
}

/**
 * Call this method anywhere during the tests. If condition is `true` it marks the test to be considered Skipped.
 * @param condition If `true` the test will be marked as Skipped.
 * @param [message] Optional message to add to the test run output after the test name.
 */
export function skipIf ( condition: boolean, message: string = '' ) {
  if (condition) {
    throw new SkipTest(message)
  }
}
