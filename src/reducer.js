import { createReducer } from './createReducer'
import { replaceWithCondition } from './actions'

let uniqId = Date.now()

// Replace task with condition
// - Recalculate coords
// - Add new entities to state
// - Replace entity in state

// Problem with recomuting coords:
// computing coords requires nested structure
// while adding entities to the store works
// with flat data

// Possible solutions:
// 1) Always work with 1 shape of data
//    - Compute geometry coupled to redux (selects entities from store by id)
//    - Migrate to MobX
// 2) Convert data depending on needs
//    - Unnecessary computations

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