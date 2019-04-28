// @flow
import type { CoordsType } from './calculateGeometry'
import React from 'react'
import { hSpacing, vSpacing, columnWidth, columnHeight } from './constants'
import { observer } from 'mobx-react'

type Props = {
  component: {
    coords: CoordsType,
  },
}

const fontSize = 14
const paddingTop = 6
const paddingLeft = 10
const iconDotsWidth = 10
const iconDotsHeight = 16
const taskHeigh = columnHeight - 2 * vSpacing

export const Task = observer(function Task ({
  onClick,
  component: { type, id, coords: { x, y } }
} : Props) {
  return (
    <g onClick={onClick}>
      <rect
        style={{
          transform: `translate(calc(50% + ${x + hSpacing - columnWidth / 2}px), ${y + vSpacing}px)`,
        }}
        width={columnWidth - 2 * hSpacing}
        height={columnHeight - 2 * vSpacing}
        fill="white"
        filter="url(#f3)"
      />
      <text
        style={{
          transform: `translate(calc(50% + ${x - columnWidth / 2 + hSpacing + paddingLeft}px), ${y + vSpacing + fontSize + paddingTop}px)`,
          fill: 'rgba(39, 43, 48, .4)',
          fontSize: 14,
          userSelect: 'none',
        }}
      >
        {type === 'task' ? 'Task' : 'Condition'} {id}
      </text>
      <text
        style={{
          transform: `translate(calc(50% + ${x - columnWidth / 2 + hSpacing + paddingLeft}px), ${y + vSpacing + fontSize + fontSize + paddingTop + paddingTop}px)`,
          fontWeight: 'bold',
          fill: '#3B424A',
          fontSize: 14,
          userSelect: 'none',
        }}
      >
        {['Collect records to process', 'Extract people'][id % 2]}
      </text>
      <path
        style={{
          transform: `translate(calc(50% + ${x + columnWidth / 2 - 2 * hSpacing - iconDotsWidth / 2 - paddingLeft}px), ${y + vSpacing + taskHeigh / 2 - 11}px)`,
          fill: '#BCBCBC',
        }}
        d='M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z'
      />
    </g>
  )
})
