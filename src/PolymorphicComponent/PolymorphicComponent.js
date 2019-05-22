import React from 'react'
import { observer } from 'mobx-react'
import { typeToComponentMapping } from './typeToComponentMapping'

export const PolymorphicComponent = observer(function PolymorphicComponent ({ component, inSequence }) {
  const ElementComponent = typeToComponentMapping[component.type]
  return (
    <ElementComponent
      component={component}
      inSequence={inSequence}
    />
  )
})