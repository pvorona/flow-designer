// @flow
import { tribonacci } from './tribonacci'
import { columnWidth, columnHeight, horizontalShift } from './constants'

type IdType = string | number

type ComponentBase = {
  id: IdType,
}

export type ComponentType =
  | SequenceType
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
  left: ComponentType,
  right: ComponentType,
}

export type SequenceType = ComponentBase & {
  type: 'sequence',
  components: Array<ComponentType>,
}

export type CoordsType = {
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

function calculatePosition (
  verticalLevel: number,
  horizontalLayer: number = 0,
) : CoordsType {
  return {
    x: horizontalLayer * columnWidth,
    y: verticalLevel * columnHeight,
  }
}

type Geometry = {
  [IdType]: PositionType,
  level: number,
}

export function calculateMaxBranchingLevel (
  component: ComponentType,
  level: number = 0,
) : number {
  if (component.type === 'task' || component.type === 'placeholder') {
    return level
  } else if (component.type === 'condition') {
    return Math.max(
      calculateMaxBranchingLevel(component.left, level + 1),
      calculateMaxBranchingLevel(component.right, level + 1),
    )
  }
  throw Error('Invalid component type provided to calculateHorizontalShift.')
}

function maxLeft (component, level = 0) : number {
  if (component.type === 'task' || component.type === 'placeholder') {
    return level
  } else if (component.type === 'condition') {
    return maxLeft(component.left, level + 1)
  }
  throw Error('!')
}

function maxRight (component, level = 0) : number {
  if (component.type === 'task' || component.type === 'placeholder') {
    return level
  } else if (component.type === 'condition') {
    return maxLeft(component.right, level + 1)
  }
  throw Error('!')
}

function wow (n: number) : number {
  return Math.pow(2, n - 1)
}

export function calculateGeometry (
  component: ComponentType,
  level: number = 0,
  horizontalLayer: number = 0,
  shouldShiftAdditionally: bool = false,
) : Geometry {
  if (component.type === 'sequence') {
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
    const numberOfConditionsLeft = wow(calculateMaxBranchingLevel(component.left, 1))
    const numberOfConditionsRight = wow(calculateMaxBranchingLevel(component.right, 1))
    const leftGeometry = calculateGeometry(
      component.left,
      level + 1,
      horizontalLayer - numberOfConditionsLeft * horizontalShift,
    )
    const rightGeometry = calculateGeometry(
      component.right,
      level + 1,
      horizontalLayer + numberOfConditionsRight * horizontalShift,
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