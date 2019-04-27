import { calculateGeometry } from './calculateGeometry'
import { columnWidth, columnHeight, horizontalShift } from './constants'

const shift = horizontalShift * columnWidth

it('simple task', () => {
  // 1
  expect(calculateGeometry({
    type: 'task',
    id: 1,
  })).toStrictEqual({ 1: { x: 0, y: 0 }, level: 1 })
})

 it('sequence of simple tasks', () => {
   // 1
   // 2
   expect(calculateGeometry({
     type: 'sequence',
     components: [
       { id: 1, type: 'task' },
       { id: 2, type: 'task' },
     ],
   })).toStrictEqual({
     1: { x: 0, y: 0 * columnHeight },
     2: { x: 0, y: 1 * columnHeight },
     level: 2,
   })
 })

  it('single condition', () => {
    //   1
    // 2   3
    expect(calculateGeometry({
      type: 'condition',
      id: 1,
      left:  { id: 2, type: 'task' },
      right: { id: 3, type: 'task' },
    })).toStrictEqual({
      1: { x:      0, y: 0 * columnHeight },
      2: { x: -shift, y: 1 * columnHeight },
      3: { x: +shift, y: 1 * columnHeight },
      level: 2,
    })
  })

  it('nested condition', () => {
    //     1
    //   2   5
    // 3   4
    expect(calculateGeometry({
      type: 'condition',
      id: 1,
      left: {
        id: 2,
        type: 'condition',
        left:  { id: 3, type: 'task' },
        right: { id: 4, type: 'task' },
      },
      right: {
        id: 5,
        type: 'task',
      },
    })).toStrictEqual({
      1: { x:  0 * shift, y: 0 * columnHeight },
      2: { x: -2 * shift, y: 1 * columnHeight },
      3: { x: -3 * shift, y: 2 * columnHeight },
      4: { x: -1 * shift, y: 2 * columnHeight },
      5: { x:  2 * shift, y: 1 * columnHeight },
      level: 3,
    })
  })

 //     1
 //     2
 //     3
 //   4   5
 // 7   8
 //     6

// it('geometry', () => {
//   const components = [{
//     type: 'task',
//     id: 1,
//   }, {
//     type: 'task',
//     id: 2,
//   }, {
//     type: 'condition',
//     id: 3,
//     left: {
//       type: 'condition',
//       id: 4,
//       left: {
//         type: 'task',
//         id: 7,
//       },
//       right: {
//         type: 'task',
//         id: 8,
//       },
//     },
//     right: {
//       type: 'task',
//       id: 5,
//     },
//   }, {
//     type: 'task',
//     id: 6,
//   }]
//   const flow = { components, type: 'sequence' }
//   const geometry = calculateGeometry(flow)
//   expect(geometry).toStrictEqual({
//     1: { x:    0, y: 0 * columnHeight },
//     2: { x:    0, y: 1 * columnHeight },
//     3: { x:    0, y: 2 * columnHeight },
//     4: { x:  -50, y: 3 * columnHeight },
//     5: { x:  +50, y: 3 * columnHeight },
//     7: { x: -100, y: 4 * columnHeight },
//     8: { x:    0, y: 4 * columnHeight },
//     6: { x:    0, y: 5 * columnHeight },
//     level: 6,
//   })
// })
