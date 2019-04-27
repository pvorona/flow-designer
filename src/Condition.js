import React from 'react'
import { connect } from 'react-redux'
import { getComponentById } from './selectors'
import { Task } from './Task'
import { PolymorphicComponent } from './PolymorphicComponent'

const ConditionComponent = ({
  component: { leftId, rightId },
  id,
}) =>
  <g>
    <Task
      id={id}
    />
    <PolymorphicComponent
      id={leftId}
    />
    <PolymorphicComponent
      id={rightId}
    />
  </g>

export const Condition = connect(
  (state, { id }) => ({
    component: getComponentById(id)(state),
  }),
)(ConditionComponent)