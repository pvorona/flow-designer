// @flow
import React from 'react'
import './App.css';
import { PolymorphicComponent } from './PolymorphicComponent'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { calculateGeometry } from './calculateGeometry'

/*
const root = observable({
  id: 0,
  type: 'sequence',
  components: [
   {
     type: 'task',
     id: 1,
   }, {
     type: 'task',
     id: 2,
   },
  //    3
  //  4   5
  // 7 8
  {
    type: 'condition',
    id: 3,
    left: {
      type: 'condition',
      id: 4,
      left: {
        type: 'task',
        id: 7,
      },
      right: {
        type: 'condition',
        id: 8,
        left: {
          type: 'condition',
          id: 9,
          left: { type: 'task', id: 15 },
          right: { type: 'task', id: 16 },
        },
        right: {
          type: 'condition',
          id: 10,
          left: { type: 'task', id: 11 },
          right: {
            type: 'condition',
            id: 12,
            left: { id: 13, type: 'task' },
            right: { id: 14, type: 'placeholder' },
          },
        },
      },
    },
    right: {
      type: 'task',
      id: 5,
    },
  },
  // {
  //   type: 'task',
  //   id: 6,
  // }
  ],
})
*/
const root = observable({
  type: 'sequence',
  components: [
    { type: 'placeholder', id: 0 },
  ],
})
let coords = calculateGeometry(root)

function traverse (component) {
  component.coords = coords[component.id]
  if (component.type === 'condition') {
    traverse(component.left)
    traverse(component.right)
  } else if (component.type === 'sequence') {
    component.components.forEach(traverse)
  }
}

traverse(root)
window.kek = function () {
  coords = calculateGeometry(root)
  traverse(root)
}

export default observer(function App () {
  return (
    <div className="container">
      <svg
        height='100%'
        width='100%'
      >
        {root.components.map(component =>
          <PolymorphicComponent
            key={component.id}
            component={component}
          />
        )}
      </svg>
    </div>
  )
})