import React from 'react'
import { connect } from 'react-redux'
import { getCoordsById } from './selectors'
import { taskWidth, taskHeight, hSpacing, vSpacing } from './constants'

const PlaceholderComponent = ({ coords: { x, y, r = (taskWidth + 2 * hSpacing) / 2 } }) =>
  <rect
    width={taskWidth - 2 * hSpacing}
    height={taskHeight - 2 * vSpacing}
    style={{
      transform: `translate(calc(50% + ${x + hSpacing}px), ${y + vSpacing}px)`,
    }}
    fill='none'
    stroke='red'
  />

export const Placeholder = connect(
  (state, { id }) => ({
    coords: getCoordsById(id)(state),
  }),
)(PlaceholderComponent)