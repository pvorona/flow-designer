// @flow
import type { CoordsType } from './calculateGeometry'
import React from 'react'
import { hSpacing, vSpacing, taskWidth, taskHeight } from './constants'
import { observer } from 'mobx-react'

type Props = {
  component: {
    coords: CoordsType,
  },
}

export const Task = observer(function Task ({ component: { coords: { x, y } } } : Props) {
  return (
    <g>
      <rect
        style={{
          transform: `translate(calc(50% + ${x + hSpacing}px), ${y + vSpacing}px)`,
          transition: 'transform .2s ease-in-out',
        }}
        width={taskWidth - 2 * hSpacing}
        height={taskHeight - 2 * vSpacing}
        stroke='grey'
        fill="none"
      />
      <text
        style={{
          transform: `translate(calc(50% + ${x + hSpacing}px), ${y + vSpacing}px)`
        }}
      >
      </text>
    </g>
  )
})
