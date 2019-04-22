// @flow
import { calculateGeometry, taskHeight } from './App'

//     1
//     2
//     3
//   4   5
// 7   8
//     6
it('geometry', () => {
  const flow = [{
    type: 'task',
    id: 1,
  }, {
    type: 'task',
    id: 2,
  }, {
    type: 'condition',
    id: 3,
    left: {
      type: 'condition',
      id: 4,
      left: {
        type: 'task',
        id: 7,
      },
      right: {
        type: 'task',
        id: 8,
      },
    },
    right: {
      type: 'task',
      id: 5,
    },
  }, {
    type: 'task',
    id: 6,
  }]
  const geometry = calculateGeometry(flow)
  expect(geometry).toStrictEqual({
    1: { x:    0, y: 0 * taskHeight },
    2: { x:    0, y: 1 * taskHeight },
    3: { x:    0, y: 2 * taskHeight },
    4: { x:  -50, y: 3 * taskHeight },
    5: { x:  +50, y: 3 * taskHeight },
    7: { x: -100, y: 4 * taskHeight },
    8: { x:    0, y: 4 * taskHeight },
    6: { x:    0, y: 5 * taskHeight },
    level: 6,
  })
})
