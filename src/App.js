// @flow
import React from 'react'
import './App.css';
import { PolymorphicComponent } from './PolymorphicComponent'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { calculateGeometry } from './calculateGeometry'
import { action } from 'mobx'

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
  id: -1,
  components: [
    { type: 'placeholder', id: 0 },
  ],
})
let coords = calculateGeometry(root)

function recalculateGeometry () {
  traverseTree(root, (component) => {
    component.coords = coords[component.id]
  })
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
  coords = calculateGeometry(root)
  recalculateGeometry()
}

window.removeComponent = action(function removeComponent (component) {
  traverseTree(root, (node) => {
    if (node === component) {
      node.type = 'placeholder'
      window.kek()
      return
    }
  })
})


const zoomStep = 0.2
const maxZoom = 1.6
const minZoom = 0.1
export const zoomState = observable({
  scale: 1,
  zoomIn () {
    this.scale = keepInBounds(this.scale + zoomStep, minZoom, maxZoom)
  },
  zoomOut () {
    this.scale = keepInBounds(this.scale - zoomStep, minZoom, maxZoom)
  }
})
window.zoomIn = zoomState.zoomIn.bind(zoomState)
window.zoomOut = zoomState.zoomOut.bind(zoomState)

const dragState = observable({
  startX: 0,
  startY: 0,
  x: 0,
  y: 0,
  translateX: 0,
  translateY: 0,
  isDragging: false,
})

function keepInBounds (value, min, max) {
  if (value < min) return min
  if (value > max) return max
  return value
}

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

const sidebarState = observable({
  visible: false,
  focusedNode: undefined,
})

window.setFocusedNode = function setFocusedNode (node) {
  sidebarState.visible = true
  sidebarState.focusedNode = node
}

window.hideSidebar = function hideSidebar () {
  sidebarState.visible = false
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
          cursor: dragState.isDragging ? 'grabbing' : 'grab',
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
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
        <g style={{
          transform: `translate(${dragState.translateX + dragState.x - dragState.startX}px, ${dragState.translateY + dragState.y - dragState.startY}px) scale(${zoomState.scale})`,
          transformOrigin: 'center',
          transition: dragState.isDragging ? undefined : 'transform .2s',
        }}>
          {root.components.map(component =>
            <PolymorphicComponent
              key={component.id}
              component={component}
            />
          )}
        </g>
      </svg>
      <div data-js="dropdown" />
      <div style={{
        position: 'fixed',
        bottom: 20,
        left: 20,
        height: 40,
        boxShadow: '0 2px 8px 0 rgba(0,0,0,0.25)',
        borderRadius: 25,
      }}>
        <button
          onClick={window.zoomIn}
          style={{
            borderRadius: '25px 0 0 25px',
            height: 40,
            padding: '0 25px',
            fontSize: 24,
            cursor: 'pointer',
            outline: 'none',
            color: '#9DA1A5',
          }}
        >+</button>
        <button
          onClick={window.zoomOut}
          style={{
            borderRadius: '0 25px 25px 0',
            height: 40,
            padding: '0 25px',
            fontSize: 24,
            cursor: 'pointer',
            outline: 'none',
            color: '#9DA1A5',
          }}
        >-</button>
        {/* {sidebarState.visible ? ( */}
        {/*   <div */}
        {/*     style={{ */}
        {/*       width: 340, */}
        {/*       height: '100%', */}
        {/*       boxShadow: '0 2px 6px 0 rgba(200,196,187,0.5)', */}
        {/*       position: 'fixed', */}
        {/*       right: 0, */}
        {/*       top: 0, */}
        {/*       background: 'white', */}
        {/*     }} */}
        {/*   > */}
        {/*     <div>{sidebarState.focusedNode.type}</div> */}
        {/*     <div>{sidebarState.focusedNode.id}</div> */}
        {/*   </div> */}
        {/* ) : null} */}
      </div>
    </div>
  )
})