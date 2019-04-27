// @flow
import type { CoordsType } from './calculateGeometry'
import React from 'react'
import { connect } from 'react-redux'
import { getCoordsById } from './selectors'
import { hSpacing, vSpacing, taskWidth, taskHeight } from './constants'

type Props = {
  coords: CoordsType,
}

const TaskComponent = ({
  coords: { x, y },
} : Props) => {
  return (
    <g>
      <rect
        style={{
          transform: `translate(calc(50% + ${x + hSpacing}px), ${y + vSpacing}px)`,
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
}

export const Task = connect(
  (state, { id }) => ({
    coords: getCoordsById(id)(state),
  }),
)(TaskComponent)