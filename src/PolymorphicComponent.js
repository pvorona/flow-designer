import React from 'react'
import { connect } from 'react-redux'
import { getComponentById } from './selectors'
import { typeToComponentMapping } from './typeToComponentMapping'

export const PolymorphicComponent = connect(
  (state, { id }) => ({
    component: getComponentById(id)(state),
  }),
)(({ component: { type }, id }) => {
  const ElementComponent = typeToComponentMapping[type]
  return <ElementComponent id={id} />
})

