import { observable } from 'mobx'

export const dropdownState = observable({
  visible: false,
  position: {
    left: 0,
    top: 0,
  },
  show () {
    this.visible = true
  },
  setPosition (position) {
    this.position = position
  },
  hide () {
    this.visible = false
  },
})

dropdownState.show = dropdownState.show.bind(dropdownState)
dropdownState.hide = dropdownState.hide.bind(dropdownState)
dropdownState.setPosition = dropdownState.setPosition.bind(dropdownState)