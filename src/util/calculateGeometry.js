// @flow
import { columnWidth, columnHeight, horizontalShift, vSpacing } from '../constants'

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
  yOffset: ?number = 0,
) : CoordsType {
  return {
    x: horizontalLayer * columnWidth,
    y: verticalLevel * columnHeight + yOffset,
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
  if (component.type === 'sequence') {
    return component.components.reduce(
      (depth, component) => depth + calculateMaxBranchingLevel(component),
      0,
    )
  } else if (component.type === 'bot' || component.type === 'human' || component.type === 'placeholder') {
    return level
  } else if (component.type === 'condition') {
    return Math.max(
      calculateMaxBranchingLevel(component.left, level + 1),
      calculateMaxBranchingLevel(component.right, level + 1),
    )
  }
  throw Error('Invalid component type provided to calculateHorizontalShift.')
}

export function getDeepestCondition (
  component: ComponentType,
  level: number = 0,
) : ComponentType {
  if (component.type === 'bot' || component.type === 'human' || component.type === 'placeholder') {
    return component
  } else if (component.type === 'condition') {
    if (calculateMaxBranchingLevel(component.left) > calculateMaxBranchingLevel(component.right)) {
      return getDeepestCondition(component.left)
    } else {
      return getDeepestCondition(component.right)
    }
    // be ready for case when depth of left === depth of right
    // need to retern different branches depending on where this geometry should go
  }
  throw Error('Invalid component type provided to calculateHorizontalShift.')
}

export function getWidth (component) {
  return calculateMaxBranchingLevel(component)
  // return (maxLeftShift(component) + maxRightShift(component)) * horizontalShift
}

function wow (n: number) : number {
  return Math.pow(2, n - 1)
}


export function calculateGeometry (tree: ComponentType) {
  if (tree.type === 'sequence') {
    let depth = 0
    let yOffset = 0
    for (let i = 0; i < tree.components.length; i++) {
      let j = 0
      calculateGeometryKnuth(tree.components[i], j, depth, yOffset)
      centerTree(tree.components[i], tree.components[i].coords.x)
      yOffset += vSpacing * (calculateMaxBranchingLevel(tree.components[i]) - 1)
      depth += calculateMaxBranchingLevel(tree.components[i]) + 1
    }
    return
  }

  // calculateGeometryKnuth(tree, 0)
  // centerTree(tree)
  function calculateGeometryKnuth (tree, i, depth = 0, yOffset = 0) {
    if (tree.type === 'condition' && tree.left) {
      i = calculateGeometryKnuth(tree.left, i, depth + 1, yOffset)
    }
    tree.coords = calculatePosition(
      depth,
      i * horizontalShift,
      yOffset,
    )
    i = i + 1
    if (tree.type === 'condition' && tree.right) {
      i = calculateGeometryKnuth(tree.right, i, depth + 1, yOffset)
    }
    return i
  }
}

function centerTree (component, centerNodeShift) {
  // const centerNodeShift = component.coords.x
  a(component)
  function a (tree) {
    if (tree.type === 'condition') {
      a(tree.left)
    }
    tree.coords.x -= centerNodeShift
    if (tree.type === 'condition') {
      a(tree.right)
    }
  }
}

export function calculateGeometry1 (
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
  } else if (component.type === 'bot' || component.type === 'human' || component.type === 'placeholder') {
    return {
      [component.id]: calculatePosition(level, horizontalLayer),
      level: level + 1,
    }
  } else if (component.type === 'condition') {
    // const maxRight = maxRightShift(component)
    // const maxLeft = maxLeftShift(component)
    // const width = maxRight + maxLeft
    // console.log({maxLeft, maxRight, width})
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