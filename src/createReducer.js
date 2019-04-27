export function createReducer(initialState, handlers) {
  if (process.env.NODE_ENV !== 'production') {
    if (initialState === undefined) {
      console.error('No initial state provided')
    }

    for (const type in handlers) {
      if (typeof handlers[type] !== 'function') {
        console.error(
          `Wrong action type (${type}) in reducer` +
          ` descriptor: ${handlers}`
        )
      }
    }

    for (const type in handlers) {
      const handler = handlers[type]

      if (handler.name === '') {
        Object.defineProperty(handler, 'name', {
          value: `${type} Reducer`,
        })
      }
    }
  }

  return function reducer(state = initialState, action) {
    const handler = handlers[action.type]

    if (process.env.NODE_ENV === 'production') {
      return typeof handler === 'function' ? handler(state, action) : state
    }

    const reducedState = typeof handler === 'function' ? handler(state, action) : state

    if (reducedState === undefined) {
      console.error(
        `Reducer with descriptor ${handlers}` +
        ` returned undefined for action ${action}`
      )
    }

    return reducedState
  }
}
