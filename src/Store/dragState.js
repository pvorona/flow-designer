import { observable } from 'mobx'

export const dragState = observable({
  startX: 0,
  startY: 0,
  x: 0,
  y: 0,
  translateX: 0,
  translateY: 0,
  isDragging: false,
})
