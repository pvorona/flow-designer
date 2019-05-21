import React, { Fragment } from 'react'
import { columnHeight, vSpacing } from '../constants'
import { observer } from 'mobx-react'
import { action } from 'mobx'
import { dropdownState, editState, zoomState } from '../Store'
import styles from './Placeholder.module.css'

const circleR = (columnHeight - 2 * vSpacing) / 2
const iconPadding = 15
const strokeWidth = 3

function PlaceholderComponent ({ component }) {
  const { coords: { x, y } } = component
  const element = React.createRef()

  const showDropdown = action(function showDropdown (e) {
    dropdownState.show()
    dropdownState.setPosition({
      left: element.current.getBoundingClientRect().left + circleR,
      top: element.current.getBoundingClientRect().top + circleR * 2 * zoomState.scale + 10,
    })
    editState.edit(component)
  })

  if (!x) debugger

  return (
    <Fragment>
      <circle
        ref={element}
        r={circleR}
        className={styles.placeholder}
        style={{
          transform: `translate(${x}px, ${y + circleR + vSpacing}px)`,
        }}
        filter="url(#component-shadow)"
        onClick={showDropdown}
      />
      <g className={styles.placeholderIcon}>
        <line
          strokeWidth={strokeWidth}
          x1={x}
          y1={y + vSpacing + iconPadding}
          x2={x}
          y2={y + circleR + circleR + vSpacing - iconPadding}
        />
        <line
          strokeWidth={strokeWidth}
          x1={x - circleR + iconPadding}
          y1={y + vSpacing + circleR}
          x2={x + circleR - iconPadding}
          y2={y + vSpacing + circleR}
        />
      </g>
    </Fragment>
  )
}

export const Placeholder = observer(PlaceholderComponent)