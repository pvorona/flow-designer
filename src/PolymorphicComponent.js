import React from 'react'
import { typeToComponentMapping } from './typeToComponentMapping'
import { observer } from 'mobx-react'

export const PolymorphicComponent = observer(function PolymorphicComponent ({ component }) {
  const ElementComponent = typeToComponentMapping[component.type]
  return <ElementComponent component={component} />
})