import React, { Fragment } from 'react'
import { observer } from 'mobx-react'
import { PolymorphicComponent } from '../PolymorphicComponent'
import { columnHeight, vSpacing } from '../constants'
import { calculateMaxBranchingLevel } from '../util'

const lineStroke = '#C3C3C3'

export const SequenceComponent = ({ component }) =>
  <Fragment>
    {component.components.map((component, index, { length }) =>
      length - 1 === index ? null :
      <line
        key={index}
        x1={component.coords.x}
        y1={component.coords.y + columnHeight + columnHeight * calculateMaxBranchingLevel(component) + vSpacing * (calculateMaxBranchingLevel(component) - 1) }
        x2={component.coords.x}
        y2={component.coords.y + columnHeight + columnHeight * calculateMaxBranchingLevel(component) + vSpacing * (calculateMaxBranchingLevel(component)) }
        stroke={lineStroke}
        strokeWidth={2}
      />
    )}
    {component.components.map(component =>
      <PolymorphicComponent
        key={component.id}
        component={component}
        inSequence
      />
    )}
  </Fragment>

export const Sequence = observer(SequenceComponent)