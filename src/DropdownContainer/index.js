import React from 'react'
import { observer } from 'mobx-react'
import { AutoHideDropdown, Option } from '../Dropdown'
import { dropdownState, editState } from '../Store'

export const DropdownContainerComponent = () =>
  dropdownState.visible ? (
    <AutoHideDropdown style={{...dropdownState.position}}>
      <Option onClick={createBotTask}>Bot Task</Option>
      <Option onClick={createHumanTask}>Human Task</Option>
      <Option onClick={createCondition}>Condition</Option>
    </AutoHideDropdown>
  ) : null

export const DropdownContainer = observer(DropdownContainerComponent)

let uniqId = 0

function createCondition () {
  dropdownState.hide()
  editState.component.title = 'New Condition'
  editState.component.type = 'condition'
  editState.component.left = {
    type: 'placeholder',
    id: ++uniqId,
  }
  editState.component.right = {
    type: 'placeholder',
    id: ++uniqId,
  }
  window.kek()
}

function createBotTask () {
  dropdownState.hide()
  editState.component.type = 'bot'
  editState.component.title = 'New Bot Task'
}

function createHumanTask () {
  dropdownState.hide()
  editState.component.type = 'human'
  editState.component.title = 'New Human Task'
}
