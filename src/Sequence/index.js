import React from 'react'
import { observer } from 'mobx-react'
import { PolymorphicComponent } from '../PolymorphicComponent'

export const SequenceComponent = ({ component }) =>
  component.components.map(component =>
    <PolymorphicComponent
      key={component.id}
      component={component}
    />
  )

export const Sequence = observer(SequenceComponent)