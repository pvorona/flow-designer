// @flow
import type { ComponentType } from './calculateGeometry'

export function normalize (
  component: ComponentType,
) : {} {
  const componentById = {}

  if (component.type === 'condition') {
    componentById[component.id] = {
      type: 'condition',
      leftId: component.left.id,
      rightId: component.right.id,
    }
    Object.assign(componentById, normalize(component.left))
    Object.assign(componentById, normalize(component.right))
  } else if (component.type === 'task' || component.type === 'placeholder') {
    componentById[component.id] = {
      type: component.type,
    }
  } else if (component.type === 'sequence') {
    for (const element of component.components) {
      Object.assign(componentById, normalize(element))
    }
  }

  return componentById
}