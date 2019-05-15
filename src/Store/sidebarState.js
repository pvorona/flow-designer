import { observable } from 'mobx'

export const sidebarState = observable({
  visible: false,
  focusedNode: undefined,
  setFocusedNode (node) {
    this.visible = true
    this.focusedNode = node
  },
  hide () {
    sidebarState.visible = false
  },
})

sidebarState.setFocusedNode = sidebarState.setFocusedNode.bind(sidebarState)
sidebarState.hide = sidebarState.hide.bind(sidebarState)

