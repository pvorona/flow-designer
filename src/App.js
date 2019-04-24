// @flow

import './App.css';

type ComponentTypeString =
  | 'task'
  | 'condition'
  | 'flow'

type IdType = string | number

type ComponentBase = {
  // type: string,
  id: IdType,
}

type ComponentsType =
  | FlowType
  | TaskType
  | ConditionType

type TaskType = ComponentBase & {
  type: 'task'
}

type ConditionType = ComponentBase & {
  type: 'condition',
  left: ComponentsType,
  right: ComponentsType,
}

type FlowType = ComponentBase & {
  type: 'flow',
  components: Array<ComponentsType>,
}

type CoordsType = {
  x: number,
  y: number,
}

type PositionType = CoordsType & {
  level: number,
}

type Size = {
  width: number,
  height: number,
}

export const taskHeight = 10
export const horizontalOffset = 50

function calculatePosition (
  verticalLevel: number,
  horizontalLayer: number = 0,
) : CoordsType {
  return {
    x: horizontalOffset * horizontalLayer,
    y: verticalLevel * taskHeight,
  }
}

// const match = (condition) => (handlers) => handlers[condition]()

type Geometry = {
  [IdType]: PositionType,
  level: number,
}

export function calculateGeometry (
  component: ComponentsType,
  level: number = 0,
  horizontalLayer: number = 0,
) : Geometry {
  if (component.type === 'flow') {
    return component.components.reduce((geometry, component) => ({
      ...geometry,
      ...calculateGeometry(component, geometry.level),
    }), { level: 0 })
  } else if (component.type === 'task') {
    return {
      [component.id]: calculatePosition(level, horizontalLayer),
      level: level + 1,
    }
  } else if (component.type === 'condition') {
    const leftGeometry = calculateGeometry(
      component.left,
      level + 1,
      horizontalLayer - 1,
    )
    const rightGeometry = calculateGeometry(
      component.right,
      level + 1,
      horizontalLayer + 1,
    )
    return {
      [component.id]: calculatePosition(level, horizontalLayer),
      ...leftGeometry,
      ...rightGeometry,
      level: Math.max(leftGeometry.level, rightGeometry.level),
    }
  }
  throw Error('Invalid component type provided to calculateGeometry.')
}

// const flow = [
//   createCondition(createTask(), createTask(), 1),
// ]
// // const flow = [1, 1, 1, 1].map((_, index) => createTask(index))
//
// const Task = ({ title, position: { x, y, width, height } }) =>
//   <React.Fragment>
//     <rect x={x} y={y} width={width} height={height} fill='grey' />
//     <text x={x} y={y + 15}>{title}</text>
//   </React.Fragment>
//
// const Condition = ({ left, right, position: { x, y } }) =>
//   <React.Fragment>
//     <Task
//       task={left}
//       position={{
//         x: x - 100,
//         y: y,
//         width: 100,
//         height: 50,
//       }}
//     />
//     <Task
//       task={right}
//       position={{
//         x: x + 100,
//         y: y,
//         width: 100,
//         height: 50,
//       }}
//     />
//   </React.Fragment>
//
// const getComponentRenderer = (component) => ({
//     task: Task,
//     condition: Condition,
//   })[component.type]
//
// class App extends Component {
//   render() {
//     return (
//       <div className="container">
//         <svg height='100%' width='100%' viewbox='0 0 100 100'>
//           {flow.map(task => {
//             const ElementComponent = getComponentRenderer(task)
//             return <ElementComponent {...task} />
//           })}
//         </svg>
//       </div>
//     )
//   }
// }

// export default App;
