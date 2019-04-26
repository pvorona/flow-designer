import { normalize } from './normalize'

it('single component', () => {
  expect(normalize({
    type: 'sequence',
    components: [{ type: 'task', id: 1 }],
  })).toStrictEqual({
    1: { type: 'task' },
  })
})

it('multiple task components', () => {
 expect(normalize({
   type: 'sequence',
   components: [
     { type: 'task', id: 1 },
     { type: 'task', id: 2 },
     { type: 'task', id: 3 },
     { type: 'task', id: 4 },
   ],
 })).toStrictEqual({
   1: { type: 'task' },
   2: { type: 'task' },
   3: { type: 'task' },
   4: { type: 'task' },
 })
})

it('single condition', () => {
 expect(normalize({
   type: 'sequence',
   components: [
     {
       type: 'condition',
       id: 1,
       left: { id: 2, type: 'task' },
       right: { id: 3, type: 'task' },
     },
   ],
 })).toStrictEqual({
   1: { type: 'condition', leftId: 2, rightId: 3 },
   2: { type: 'task' },
   3: { type: 'task' },
 })
})

it('multiple conditions', () => {
  expect(normalize({
    type: 'sequence',
    components: [
      {
        type: 'condition',
        id: 1,
        left: { id: 2, type: 'task' },
        right: { id: 3, type: 'task' },
      },
      { id: 4, type: 'task' },
      {
        type: 'condition',
        id: 5,
        left: {
          id: 6,
          type: 'condition',
          left: {
            type: 'task',
            id: 8,
          },
          right: {
            type: 'task',
            id: 9,
          },
        },
        right: {
          id: 7,
          type: 'condition',
          left: {
            type: 'task',
            id: 10,
          },
          right: {
            type: 'task',
            id: 11,
          },
        },
      },
    ],
  })).toStrictEqual({
    1: { type: 'condition', leftId: 2, rightId: 3 },
    2: { type: 'task' },
    3: { type: 'task' },
    4: { type: 'task' },
    5: { type: 'condition', leftId: 6, rightId: 7 },
    6: { type: 'condition', leftId: 8, rightId: 9 },
    7: { type: 'condition', leftId: 10, rightId: 11 },
    8: { type: 'task' },
    9: { type: 'task' },
    10: { type: 'task' },
    11: { type: 'task' },
  })
})