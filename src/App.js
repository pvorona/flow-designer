import React, { Component } from 'react';
import './App.css';

function createTask () {
  return {
    type: 'task',
    title: 'Extract',
  }
}

function createPositionedTask (row) {
  return {
    ...createTask(),
    position: calculateTaskPosition(row),
  }
}

function calculateTaskPosition (row) {
  return {
    x: 50,
    y: row * 50 + row * 20,
    width: 100,
    height: 50,
  }
}

function createCondition (left, right, row) {
  return {
    type: 'condition',
    left,
    right,
    position: calculateTaskPosition(row),
  }
}

const flow = [
  createPositionedTask(0),
  createCondition(createTask(), createTask(), 1),
  createPositionedTask(2),
  createPositionedTask(3),
  createPositionedTask(4),
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
