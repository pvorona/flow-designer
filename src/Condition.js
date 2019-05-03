import React from 'react'
import { Task } from './Task'
import { PolymorphicComponent } from './PolymorphicComponent'
import { columnHeight, vSpacing, columnWidth, hSpacing } from './constants'
import { observer } from 'mobx-react'
import { calculateMaxBranchingLevel, getDeepestCondition } from './calculateGeometry'

const lineStroke = '#C3C3C3'


export const Condition = observer(({ component }) => {
  return (
    <g>
      <Task
        component={component}
        onClick={(e) => {
          window.removeComponent(component)}
        }
      />
      <PolymorphicComponent
        component={component.left}
      />
      <PolymorphicComponent
        component={component.right}
      />
      <line
        x1={component.coords.x}
        y1={component.coords.y + columnHeight - vSpacing}
        x2={component.coords.x}
        y2={component.left.coords.y}
        stroke={lineStroke}
        strokeWidth={2}
        style={{
          transform: 'translateX(50%)'
        }}
      />
      <line
        x1={component.coords.x}
        y1={component.left.coords.y}
        x2={component.left.coords.x}
        y2={component.left.coords.y}
        stroke={lineStroke}
        strokeWidth={2}
        style={{
          transform: 'translateX(50%)'
        }}
      />
      <line
        x1={component.left.coords.x}
        y1={component.left.coords.y}
        x2={component.left.coords.x}
        y2={component.left.coords.y + vSpacing}
        stroke={lineStroke}
        strokeWidth={2}
        style={{
          transform: 'translateX(50%)'
        }}
      />
      <line
        x1={component.coords.x}
        y1={component.right.coords.y}
        x2={component.right.coords.x}
        y2={component.right.coords.y}
        stroke={lineStroke}
        strokeWidth={2}
        style={{
          transform: 'translateX(50%)'
        }}
      />
      <line
        x1={component.right.coords.x}
        y1={component.right.coords.y}
        x2={component.right.coords.x}
        y2={component.right.coords.y + vSpacing}
        stroke={lineStroke}
        strokeWidth={2}
        style={{
          transform: 'translateX(50%)'
        }}
      />

      <line
        x1={component.left.coords.x}
        y1={component.left.coords.y + columnHeight - vSpacing}
        x2={component.left.coords.x}
        y2={component.left.coords.y + columnHeight}
        stroke={lineStroke}
        strokeWidth={2}
        style={{
          transform: 'translateX(50%)'
        }}
      />
      <line
        x1={component.right.coords.x}
        y1={component.right.coords.y + columnHeight - vSpacing}
        x2={component.right.coords.x}
        y2={component.right.coords.y + columnHeight}
        stroke={lineStroke}
        strokeWidth={2}
        style={{
          transform: 'translateX(50%)'
        }}
      />
      <line
        x1={component.left.coords.x}
        y1={component.coords.y + columnHeight + columnHeight * calculateMaxBranchingLevel(component) + vSpacing * (calculateMaxBranchingLevel(component) - 1) }
        x2={component.right.coords.x}
        y2={component.coords.y + columnHeight + columnHeight * calculateMaxBranchingLevel(component) + vSpacing * (calculateMaxBranchingLevel(component) - 1) }
        stroke={lineStroke}
        strokeWidth={2}
        style={{
          transform: 'translateX(50%)'
        }}
      />
      <line
        x1={component.coords.x}
        y1={component.coords.y + columnHeight + columnHeight * calculateMaxBranchingLevel(component) + vSpacing * (calculateMaxBranchingLevel(component) - 1) }
        x2={component.coords.x}
        y2={component.coords.y + columnHeight + columnHeight * calculateMaxBranchingLevel(component) + vSpacing * (calculateMaxBranchingLevel(component)) }
        stroke={lineStroke}
        strokeWidth={2}
        style={{
          transform: 'translateX(50%)'
        }}
      />
      {calculateMaxBranchingLevel(component.left) > calculateMaxBranchingLevel(component.right) &&
        <line
          stroke={lineStroke}
          strokeWidth={2}
          style={{
            transform: 'translateX(50%)'
          }}
          x1={component.right.coords.x}
          y1={component.coords.y + columnHeight + columnHeight * calculateMaxBranchingLevel(component.right, 1) + vSpacing * (calculateMaxBranchingLevel(component.right, 1) - 1) }
          x2={component.right.coords.x}
          y2={component.coords.y + columnHeight + columnHeight * calculateMaxBranchingLevel(component) + vSpacing * (calculateMaxBranchingLevel(component) - 1)}
        />
      }
      {calculateMaxBranchingLevel(component.left) < calculateMaxBranchingLevel(component.right) &&
        <line
          stroke={lineStroke}
          strokeWidth={2}
          style={{
            transform: 'translateX(50%)'
          }}
          x1={component.left.coords.x}
          y1={component.coords.y + columnHeight + columnHeight * calculateMaxBranchingLevel(component.left, 1) + vSpacing * (calculateMaxBranchingLevel(component.left, 1) - 1) }
          x2={component.left.coords.x}
          y2={component.coords.y + columnHeight + columnHeight * calculateMaxBranchingLevel(component) + vSpacing * (calculateMaxBranchingLevel(component) - 1)}
        />
      }
    </g>
  )
})