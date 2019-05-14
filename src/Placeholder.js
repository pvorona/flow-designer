import React from 'react'
import { columnWidth, columnHeight, hSpacing, vSpacing } from './constants'
import { observer } from 'mobx-react'
import { action } from 'mobx'
import styles from './Placeholder.module.css'


const circleR = (columnHeight - 2 * vSpacing) / 2
const iconPadding = 15
const strokeWidth = 3

export const Placeholder = observer(function Placeholder ({ component }) {
  const { coords: { x, y } } = component
  const element = React.createRef()

  const magic = action(function magicInside (e) {
    window.dropdownState.show()
    window.dropdownState.setPosition({
      left: element.current.getBoundingClientRect().left + circleR,
      top: element.current.getBoundingClientRect().top + circleR * 2 + 10,
    })
    window.editState.edit(component)
  })

  return (
    <>
      <circle
        ref={element}
        r={circleR}
        className={styles.placeholder}
        style={{
          transform: `translate(calc(50% + ${x}px), ${y + circleR + vSpacing}px)`,
        }}
        filter="url(#f3)"
        onClick={magic}
      />
      <g className={styles.placeholderIcon}>
        <line
          style={{
            transform: 'translateX(50%)',
          }}
          strokeWidth={strokeWidth}
          x1={x}
          y1={y + vSpacing + iconPadding}
          x2={x}
          y2={y + circleR + circleR + vSpacing - iconPadding}
        />
        <line
          style={{
            transform: 'translateX(50%)',
          }}
          strokeWidth={strokeWidth}
          x1={x - circleR + iconPadding}
          y1={y + vSpacing + circleR}
          x2={x + circleR - iconPadding}
          y2={y + vSpacing + circleR}
        />
      </g>
    </>
  )
})