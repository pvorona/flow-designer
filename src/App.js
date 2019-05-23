// @flow
import React from 'react'
import './App.css';
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { action } from 'mobx'
import { calculateGeometry } from './util'
import { dragState } from './Store'
import { Defs } from './Defs'
import { Root } from './Root'
import { ZoomControls } from './ZoomControls'
import { DropdownContainer } from './DropdownContainer'
import { SidebarContainer } from './SidebarContainer'

export const root = window.seq = observable({
  type: 'sequence',
  id: -1,
  components: [
    { type: 'placeholder', id: 0 },
  ],
})
calculateGeometry(root)
// let coords = calculateGeometry(root)

function recalculateGeometry () {
  calculateGeometry(root)
  // traverseTree(root, (component) => {
  //   component.coords = coords[component.id]
  // })
}

function traverseTree (component, callback) {
  callback(component)
  if (component.type === 'condition') {
    traverseTree(component.left, callback)
    traverseTree(component.right, callback)
  } else if (component.type === 'sequence') {
    component.components.forEach(node => traverseTree(node, callback))
  }
}

recalculateGeometry()
window.kek = function () {
  const newComponents = []
  root.components.forEach(component => {
    if (component.type === 'placeholder' && newComponents.length && newComponents[newComponents.length - 1].type === 'placeholder') {
      return
    }
    newComponents.push(component)
  })
  root.components = newComponents
  calculateGeometry(root)
  // coords = calculateGeometry(root)
  // recalculateGeometry()
}

window.removeComponent = action(function removeComponent (component) {
  component.type = 'placeholder'
  window.kek()
})

const onMouseDown = action(function onMouseDown (e) {
  dragState.translateX = dragState.translateX + dragState.x - dragState.startX
  dragState.translateY = dragState.translateY + dragState.y - dragState.startY
  dragState.isDragging = true
  dragState.startX = e.clientX
  dragState.startY = e.clientY
  dragState.x = e.clientX
  dragState.y = e.clientY
})

const onMouseMove = action(function onMouseMove (e) {
  if (dragState.isDragging === false) return

  dragState.x = e.clientX
  dragState.y = e.clientY
})

const onMouseUp = action(function onMouseUp () {
  dragState.isDragging = false
})

export default observer(function App () {
  return (
    <div className="container">
      <svg
        height='100%'
        width='100%'
        style={{
          background: '-webkit-repeating-radial-gradient(center center, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 100%)',
          backgroundSize: '16px 16px',
          cursor: dragState.isDragging ? 'grabbing' : 'grab',
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        <Defs />
        <Root component={root} />
      </svg>
      <ZoomControls />
      <SidebarContainer />
      <DropdownContainer />
    </div>
  )
})

