// @flow
import React, { Component } from 'react'
import './App.css';
import { connect } from 'react-redux'
import { taskWidth, taskHeight } from './calculateGeometry'

 // const hSpacing = 20
 // const vSpacing = 40

const hSpacing = 10
const vSpacing = 10
const Task = connect(
  (state, { id }) => state.geometry[id],
)(({ x, y }) => {
  return (
    <g>
      <rect
        x={x + hSpacing}
        y={y + vSpacing}
        width={taskWidth - 2 * hSpacing}
        height={taskHeight - 2 * vSpacing}
        stroke='grey'
        fill="none"
      />
      {/* <text x={x} y={y + 15}>{title}</text> */}
    </g>
  )
})

const Condition = connect(
  (state, { id }) => state.componentsById[id],
)(({ id, leftId, rightId }) =>
  <g>
    <Task
      id={id}
    />
    <ChooseComponent
      id={leftId}
    />
    <ChooseComponent
      id={rightId}
    />
  </g>
)

const Placeholder = connect(
  (state, { id }) => state.geometry[id],
)(({ x, y, r = (taskWidth - 2 * hSpacing) / 4 }) =>
  <circle
    cx={x + 2 * r}
    cy={y + r}
    r={r}
    fill='none'
    stroke='grey'
  />
)

const ChooseComponent = connect(
  (state, { id }) => state.componentsById[id],
)(({ type, id }) => {
  const ElementComponent = getComponentRenderer(type)
  return <ElementComponent id={id} />
})

const getComponentRenderer = (type) => ({
    task: Task,
    condition: Condition,
    placeholder: Placeholder,
  })[type]

class App extends Component<any> {
  render() {
    const { flow } = this.props

    return (
      <div className="container">
        <svg height='100%' width='100%' viewBox='-400 0 1040 768'>
          {flow.components.map(component =>
            <ChooseComponent
              key={component.id}
              id={component.id}
            />
          )}
        </svg>
      </div>
    )
  }
}

export default connect(
  ({ flow }) => ({ flow }),
)(App)
