
import type { Event, State } from 'jest-circus'

export async function handler ( event: Event, state: State ) {

  if ( event.name === 'test_done' ) {

    const skipTestError = event.test.errors.find( ( e: any ) => e && e.length && e[0] && e[0].name && e[0].name === 'SkipTest' )

    if (skipTestError) {
      event.test.errors = []
      event.test.status = 'skip'
      if (skipTestError[0].message) {
        event.test.name = `${event.test.name} ~> ${skipTestError[0].message}`
      }
    }
  }
}
