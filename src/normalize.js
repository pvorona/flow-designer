// @flow
import type { ComponentType } from './calculateGeometry'

export function normalize (
  component: ComponentType,
) : {} {
  const componentsById = {}

  if (component.type === 'condition') {
    componentsById[component.id] = {
      type: 'condition',
      leftId: component.left.id,
      rightId: component.right.id,
    }
    Object.assign(componentsById, normalize(component.left))
    Object.assign(componentsById, normalize(component.right))
  } else if (component.type === 'task') {
    componentsById[component.id] = {
      type: 'task',
    }
  } else if (component.type === 'sequence') {
    for (const element of component.components) {
      Object.assign(componentsById, normalize(element))
    }
  }

  return componentsById
}