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
        style={{
          background: '-webkit-repeating-radial-gradient(center center, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 100%)',
          backgroundSize: '16px 16px',
        }}
      >
      {/* box-shadow: 0 2px 6px 0 rgba(200,196,187,0.5); */}
        <defs>
          <filter id="f3" x="-30%" y="-30%" width="200%" height="200%">
            <feOffset result="offOut" in="SourceAlpha" dx="0" dy="2" />
            <feColorMatrix
              type="matrix"
              result="matrixOut"
              in="offOut"
              values="0 1 0 0 0
                      0 1 0 0 0
                      0 1 0 0 0
                      0 1 0 0.2 0"
            />
            <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="3" />
            <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
          </filter>
        </defs>
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