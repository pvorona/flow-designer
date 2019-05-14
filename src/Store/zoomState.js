import { observable } from 'mobx'

const zoomStep = 0.2
const maxZoom = 1.6
const minZoom = 0.4

export const zoomState = observable({
  scale: 1,
  zoomIn () {
    this.scale = ensureBounds(this.scale + zoomStep, minZoom, maxZoom)
  },
  zoomOut () {
    this.scale = ensureBounds(this.scale - zoomStep, minZoom, maxZoom)
  },
})

zoomState.zoomIn = zoomState.zoomIn.bind(zoomState)
zoomState.zoomOut = zoomState.zoomOut.bind(zoomState)

function ensureBounds (value, min, max) {
  if (value < min) return min
  if (value > max) return max
  return value
}