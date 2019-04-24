// @flow

type ComponentTypeString =
  | 'task'
  | 'condition'
  | 'flow'

type IdType = string | number

type ComponentBase = {
  // type: string,
  id: IdType,
}

type ComponentsType =
  | FlowType
  | TaskType
  | ConditionType
  | PlaceholderType

type PlaceholderType = ComponentBase & {
  type: 'placeholder',
}

type TaskType = ComponentBase & {
  type: 'task'
}

type ConditionType = ComponentBase & {
  type: 'condition',
  left: ComponentsType,
  right: ComponentsType,
}

type FlowType = ComponentBase & {
  type: 'flow',
  components: Array<ComponentsType>,
}

type CoordsType = {
  x: number,
  y: number,
}

type PositionType = CoordsType & {
  level: number,
}

type Size = {
  width: number,
  height: number,
}

export const taskWidth = 50
export const taskHeight = 50

function calculatePosition (
  verticalLevel: number,
  horizontalLayer: number = 0,
) : CoordsType {
  return {
    x: horizontalLayer * taskWidth,
    y: verticalLevel * taskHeight,
  }
}

// const match = (condition) => (handlers) => handlers[condition]()

type Geometry = {
  [IdType]: PositionType,
  level: number,
}

// export const horizontalShift: number = 1
export const horizontalShift: number = .5

export function calculateHorizontalShift (
  component: ComponentsType,
  shift: number = 0,
) : number {
  if (component.type === 'task' || component.type === 'placeholder') {
    return shift
  } else if (component.type === 'condition') {
    return Math.max(
      calculateHorizontalShift(component.left, shift + 1),
      calculateHorizontalShift(component.right, shift + 1),
    )
  }
  throw Error('Invalid component type provided to calculateHorizontalShift.')
}

function calculateNumberOfConditions (
  component: ComponentsType,
  level: number = 0,
) : number {
  if (component.type === 'task') {
    return level
  } else if (component.type === 'condition') {
    return Math.max(
      calculateNumberOfConditions(component.left, level + 1),
      calculateNumberOfConditions(component.right, level + 1),
    )
  }
  throw Error('Invalid component type provided to calculateHorizontalShift.')
}

function coolStaff (n) {
  return n
  // if (n === 1) return 1
  // if (n === 2) return 2
  // if (n === 3) return 3
  // if (n === 4) return 4
  // return 5

  // if (n < 3) return n
  // if (n === 3) return 4
  // return kek(n)
// 1, 2, 4,
  // return (3 * (-1 + Math.pow(-1, n)) + 2 * (5 + Math.pow(-1, n)) * n + 14 * Math.pow(n, 2)) / 16
}


function tribonacci (n: number) : number {
  if (n < 3) return n
  return tribonacci(n - 1) + tribonacci(n - 2) + 2 * tribonacci(n - 3)
}

export function calculateGeometry (
  component: ComponentsType,
  level: number = 0,
  horizontalLayer: number = 0,
  shouldShiftAdditionally: bool = false,
) : Geometry {
  if (component.type === 'flow') {
    return component.components.reduce((geometry, component) => ({
      ...geometry,
      ...calculateGeometry(component, geometry.level),
    }), { level: 0 })
  } else if (component.type === 'task' || component.type === 'placeholder') {
    return {
      [component.id]: calculatePosition(level, horizontalLayer),
      level: level + 1,
    }
  } else if (component.type === 'condition') {
    const numberOfConditions = tribonacci(calculateNumberOfConditions(component))
    const leftGeometry = calculateGeometry(
      component.left,
      level + 1,
      horizontalLayer - numberOfConditions * horizontalShift,
    )
    const rightGeometry = calculateGeometry(
      component.right,
      level + 1,
      horizontalLayer + numberOfConditions * horizontalShift,
    )
    return {
      [component.id]: calculatePosition(level, horizontalLayer),
      ...leftGeometry,
      ...rightGeometry,
      level: Math.max(leftGeometry.level, rightGeometry.level),
    }
  }
  throw Error('Invalid component type provided to calculateGeometry.')
}