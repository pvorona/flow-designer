import React from 'react'
import { taskWidth, taskHeight, hSpacing, vSpacing } from './constants'
import { observer } from 'mobx-react'
import { action } from 'mobx'

let uniqId = Date.now()

export const Placeholder = observer(function Placeholder ({ component }) {
  const { coords: { x, y } } = component

  const magic = action(function magicInside () {
    component.type = 'condition'
    component.left = {
      type: 'placeholder',
      id: ++uniqId,
    }
    component.right = {
      type: 'placeholder',
      id: ++uniqId,
    }
    window.kek()
  })

  return (
    <rect
      width={taskWidth - 2 * hSpacing}
      height={taskHeight - 2 * vSpacing}
      style={{
        transform: `translate(calc(50% + ${x + hSpacing}px), ${y + vSpacing}px)`,
        transition: 'transform .2s ease-in-out',
      }}
      fill='red'
      stroke='black'
      onClick={magic}
    />
  )
  }
)