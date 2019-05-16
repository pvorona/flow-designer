// @flow
import { columnWidth, columnHeight, horizontalShift } from '../constants'

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

function calculatePosition (
  verticalLevel: number,
  horizontalLayer: number = 0,
) : CoordsType {
  return {
    x: horizontalLayer * columnWidth,
    y: verticalLevel * columnHeight,
  }
}

export function calculateMaxBranchingLevel (
  component: ComponentType,
  level: number = 0,
) : number {
  if (component.type === 'bot' || component.type === 'human' || component.type === 'placeholder') {
    return level
  } else if (component.type === 'condition') {
    return Math.max(
      calculateMaxBranchingLevel(component.left, level + 1),
      calculateMaxBranchingLevel(component.right, level + 1),
    )
  } else if (component.type === 'sequence') {
    return component.components.length
  }
  throw Error('Invalid component type provided to calculateHorizontalShift.')
}

export function calculateGeometry (tree: ComponentType) {
//   if (tree.type === 'sequence') {
//     tree.components.forEach(calculateGeometry)
//   }
//
  let i = 0
  calculateGeometryKnuth(tree, 0)
  console.log(tree)
  // centerTree(tree)
  function calculateGeometryKnuth (tree, depth = 0) {
    if (tree.type === 'sequence') {
      for (let j = 0; j < tree.components.length; j++) {
        const component = tree.components[j]
        calculateGeometryKnuth(component, depth + j)
      }
    } else {
      if (tree.type === 'condition') {
        calculateGeometryKnuth(tree.left, depth + 1, i)
      }
      tree.coords = calculatePosition(
        depth,
        i * horizontalShift,
      )
      i += 1
      if (tree.type === 'condition') {
        calculateGeometryKnuth(tree.right, depth + 1, i)
      }
    }
  }
}

function centerTree (component) {
  const centerNodeShift = component.components[0].coords.x
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