import { createReducer } from './createReducer'
import { replaceWithCondition } from './actions'

let uniqId = Date.now()

// Replace task with condition
// - Recalculate coords
// - Add new entities to state
// - Replace entity in state

export const reducer = createReducer({
  root: {},
  componentById: {},
  coords: {},
}, {
  [replaceWithCondition]: (state, { id }) => ({
    ...state,
    componentById: {
      ...state.componentById,
      [id]: {
        type: 'condition',
        leftId: ++uniqId,
        rightId: ++uniqId,
      },
      [uniqId - 1]: {
        type: 'task',
      },
      [uniqId - 2]: {
        type: 'task',
      },
    },
    // root
  })
})