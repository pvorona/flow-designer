import React from 'react'
import { Task } from './Task'
import { PolymorphicComponent } from './PolymorphicComponent'
import { observer } from 'mobx-react'

export const Condition = observer(({ component }) =>
  <g>
    <Task
      component={component}
    />
    <PolymorphicComponent
      component={component.left}
    />
    <PolymorphicComponent
      component={component.right}
    />
  </g>
)
