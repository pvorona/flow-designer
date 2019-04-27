import React from 'react'
import { columnWidth, columnHeight, hSpacing, vSpacing } from './constants'
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
      width={columnWidth - 2 * hSpacing}
      height={columnHeight - 2 * vSpacing}
      style={{
        transform: `translate(calc(50% + ${x + hSpacing - columnWidth / 2}px), ${y + vSpacing}px)`,
        transition: 'transform .2s ease-in-out',
      }}
      fill='white'
      filter="url(#f3)"
      onClick={magic}
    />
  )
})