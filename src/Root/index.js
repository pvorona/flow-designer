import React from 'react'
import { observer } from 'mobx-react'
import { dragState, zoomState } from '../Store'
import { PolymorphicComponent } from '../PolymorphicComponent'

const RootComponent = ({ component }) => {
  const x = dragState.translateX + dragState.x - dragState.startX
  const y = dragState.translateY + dragState.y - dragState.startY

  return (
    <g style={{
      transform: `translate(calc(50% + ${x}px), ${y}px) scale(${zoomState.scale})`,
      transition: dragState.isDragging ? undefined : 'transform .2s',
      willChange: 'transform',
    }}>
      <PolymorphicComponent
        key={component.id}
        component={component}
      />
    </g>
  )
}

export const Root = observer(RootComponent)