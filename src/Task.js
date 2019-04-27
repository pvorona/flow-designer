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
const paddingTop = 10
const paddingLeft = 10

export const Task = observer(function Task ({ component: { coords: { x, y } } } : Props) {
  return (
    <g>
      <rect
        style={{
          transform: `translate(calc(50% + ${x + hSpacing - columnWidth / 2}px), ${y + vSpacing}px)`,
          transition: 'transform .2s ease-in-out',
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
        }}
      >
        Task
      </text>
    </g>
  )
})
