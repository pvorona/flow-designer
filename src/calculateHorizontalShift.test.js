import {
  calculateHorizontalShift,
} from './calculateGeometry'

it('single task', () => {
  expect(calculateHorizontalShift({
    type: 'task',
    id: 1
  })).toStrictEqual(0)
})

it('single nested task', () => {
  expect(calculateHorizontalShift({
    type: 'task',
    id: 1
  }, 3)).toStrictEqual(3)
})

it('single condition', () => {
  expect(calculateHorizontalShift({
    type: 'condition',
    id: 1,
    left: {
      type: 'task',
      id: 2,
    },
    right: {
      type: 'task',
      id: 3,
    },
  })).toStrictEqual(1)
})

it('nested condition', () => {
  expect(calculateHorizontalShift({
    type: 'condition',
    id: 1,
    left: {
      type: 'condition',
      id: 2,
      left: { type: 'task', id: 4 },
      right: { type: 'task', id: 5 },
    },
    right: {
      type: 'task',
      id: 3,
    },
  })).toStrictEqual(2)
})

it('multiple nested conditions', () => {
  //       1
  //   2       3
  // 4   5   9   6
  //       7   8
  expect(calculateHorizontalShift({
    type: 'condition',
    id: 1,
    left: {
      type: 'condition',
      id: 2,
      left: { type: 'task', id: 4 },
      right: { type: 'task', id: 5 },
    },
    right: {
      type: 'condition',
      id: 3,
      left: {
        type: 'condition',
        id: 9,
        left: { type: 'task', id: 7 },
        right: { type: 'task', id: 8 },
      },
      right: {
        type: 'task',
        id: 6,
      },
    },
  })).toStrictEqual(3)
})

// nested condition - task - condiiton