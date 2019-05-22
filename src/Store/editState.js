import { observable } from 'mobx'

export const editState = observable({
  component: undefined,
  inSequence: false,
  edit (component, inSequence) {
    this.component = component
    this.inSequence = inSequence
  }
})

editState.edit = editState.edit.bind(editState)