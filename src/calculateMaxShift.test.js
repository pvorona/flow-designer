// import { calculateMaxShift } from './calculateGeometry'
//
// it('single task', () => {
//   expect(calculateMaxShift({
//     type: 'task'
//   })).toBe(0)
// })
//
// it('single condition', () => {
//   expect(calculateMaxShift({
//     type: 'condition',
//     left: { type: 'task' },
//     right: { type: 'task' },
//   })).toBe(1)
// })
//
// it('nested condition', () => {
//   //   1
//   //  2 3
//   // 4 5
//   expect(calculateMaxShift({
//     type: 'condition',
//     left: { type: 'condition', left: { type: 'task' }, right: { type: 'task' } },
//     right: { type: 'task' },
//   })).toBe(2)
// })
//
// it('2 nested condition', () => {
//   //     1
//   //  2     3
//   // 4 5
//   //  6 7
//   expect(calculateMaxShift({
//     type: 'condition',
//     left: {
//       type: 'condition',
//       left: { type: 'task' },
//       right: {
//         type: 'condition',
//         left: { type: 'task' },
//         right: { type: 'task' },
//       },
//     },
//     right: { type: 'task' },
//   })).toBe(2)
// })
//
// it('3 nested condition', () => {
//   //     1
//   //  2     3
//   // 4 5
//   //  6 7
//   //
//   expect(calculateMaxShift({
//     type: 'condition',
//     left: {
//       type: 'condition',
//       left: { type: 'task' },
//       right: {
//         type: 'condition',
//         left: { type: 'task' },
//         right: { type: 'task' },
//       },
//     },
//     right: { type: 'task' },
//   })).toBe(2)
// })