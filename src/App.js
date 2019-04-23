// @flow

import React, { Component } from 'react';
import './App.css';

type ComponentTypeString =
  | 'task'
  | 'condition'
  | 'flow'

type ComponentType = {
  type: ComponentTypeString,
  id: string | number,
}

type ConditionType = ComponentType & {
  left: ComponentType,
  right: ComponentType,
}

type FlowType = ComponentType & {
  components: Array<ComponentType>
}

type PositionType = {
  x: number,
  y: number,
}

type Size = {
  width: number,
  height: number,
}

function createTask () : ComponentType {
  return {
    type: 'task',
    title: 'Execution',
  }
}

function createCondition (
  left: ComponentType,
  right: ComponentType,
) : ConditionType {
  return {
    type: 'condition',
    left,
    right,
  }
}

export const taskHeight = 10
export const horizontalOffset = 50

function calculatePosition (
  verticalLevel: number,
  horizontalLayer: number = 0,
) : PositionType {
  return {
    x: horizontalOffset * horizontalLayer,
    y: verticalLevel * taskHeight,
  }
}

// const match = (condition) => (handlers) => handlers[condition]()
// match(component.type)({
//   flow: () =>
//   task: () =>
//   condition: () =>
// })

export function calculateGeometry (
  component: ComponentType,
  level: number = 0,
  horizontalLayer: number = 0,
) : PositionType {
  if (component.type === 'flow') {
    return component.elements.reduce((geometry, component) => ({
      ...geometry,
      ...calculateGeometry(component, geometry.level),
    }), { level: 0 })
  } else if (component.type === 'task') {
    return {
      [component.id]: calculatePosition(level, horizontalLayer),
      level: level + 1,
    }
  } else if (component.type === 'condition') {
    const geometry = {}
    geometry[component.id] = calculatePosition(level, horizontalLayer)
    const leftBranchGeometry = calculateGeometry(
      component.left,
      level + 1,
      horizontalLayer - 1,
    )
    const rightBranchGeometry = calculateGeometry(
      component.right,
      level + 1,
      horizontalLayer + 1,
    )
    Object.assign(geometry, leftBranchGeometry, rightBranchGeometry)
    geometry.level = leftBranchGeometry.level
    return geometry
  }
}

const flow = [
  createCondition(createTask(), createTask(), 1),
]
// const flow = [1, 1, 1, 1].map((_, index) => createTask(index))

const Task = ({ title, position: { x, y, width, height } }) =>
  <React.Fragment>
    <rect x={x} y={y} width={width} height={height} fill='grey' />
    <text x={x} y={y + 15}>{title}</text>
  </React.Fragment>

const Condition = ({ left, right, position: { x, y } }) =>
  <React.Fragment>
    <Task
      task={left}
      position={{
        x: x - 100,
        y: y,
        width: 100,
        height: 50,
      }}
    />
    <Task
      task={right}
      position={{
        x: x + 100,
        y: y,
        width: 100,
        height: 50,
      }}
    />
  </React.Fragment>

const getComponentRenderer = (component) => ({
    task: Task,
    condition: Condition,
  })[component.type]

class App extends Component {
  render() {
    return (
      <div className="container">
        <svg height='100%' width='100%' viewbox='0 0 100 100'>
          {flow.map(task => {
            const ElementComponent = getComponentRenderer(task)
            return <ElementComponent {...task} />
          })}
        </svg>
      </div>
    )
  }
}

export default App;
