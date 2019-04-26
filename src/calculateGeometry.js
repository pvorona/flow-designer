// @flow
import { tribonacci } from './tribonacci'

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

type Geometry = {
  [IdType]: PositionType,
  level: number,
}

export const horizontalShift: number = .5

export function calculateHorizontalShift (
  component: ComponentType,
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
  component: ComponentType,
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