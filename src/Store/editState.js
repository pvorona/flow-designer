import { observable } from 'mobx'

export const editState = observable({
  component: undefined,
  edit (component) {
    this.component = component
  }
})

editState.edit = editState.edit.bind(editState)