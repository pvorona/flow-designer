// @flow
import type { CoordsType } from './calculateGeometry'
import React from 'react'
import { observer } from 'mobx-react'
import { hSpacing, vSpacing, columnWidth, columnHeight } from '../constants'

type Props = {
  component: {
    coords: CoordsType,
  },
}

const fontSize = 14
const paddingTop = 8
const paddingLeft = 10
const iconDotsWidth = 10
// const iconDotsHeight = 16
const taskHeigh = columnHeight - 2 * vSpacing

const botIconHeight = 28
const botIconWidth = 25

const textLeftPadding = 10
const textVSpacing = 2

export const Task = observer(function Task ({
  onClick,
  component: { type, id, coords: { x, y } }
} : Props) {
  return (
    <g onClick={onClick}>
      <rect
        style={{
          transform: `translate(${x + hSpacing - columnWidth / 2}px, ${y + vSpacing}px)`,
        }}
        width={columnWidth - 2 * hSpacing}
        height={columnHeight - 2 * vSpacing}
        fill="white"
        filter="url(#component-shadow)"
      />
      <path
        style={{
          transform: `translate(${x - columnWidth / 2 + hSpacing + paddingLeft}px, ${y + vSpacing + (taskHeigh - botIconHeight) / 2}px)`
        }}
        d="M24.55 19.88a10.22 10.22 0 0 1-4.5 5.9 14.51 14.51 0 0 1-7.78 2.19C6.4 27.97 1.5 24.72.1 19.89a2.95 2.95 0 0 1 .48-2.51c.48-.64 1.2-1 2.03-1h8.11a.8.8 0 0 0 .8-.8v-.43a.8.8 0 0 0-.8-.8h-6.5a2.51 2.51 0 0 1-2.48-2.55v-1.18c0-2.33.73-4.1 2.17-5.3a7.1 7.1 0 0 1 4.52-1.45h.19a.8.8 0 0 0 .8-.8V.8a.8.8 0 1 1 1.61 0v2.26c0 .44.36.8.8.8h4.34c1.87 0 3.47.52 4.64 1.5 1.4 1.17 2.12 2.92 2.12 5.2v1.23c0 1.4-1.11 2.54-2.48 2.54h-6.5a.8.8 0 0 0-.81.8v.44c0 .45.36.8.8.8h7.98c.91 0 1.7.36 2.2 1.01.5.68.67 1.6.43 2.49zm-4.1-7.15c.47 0 .87-.43.87-.93v-1.24c0-4.41-3.23-5.08-5.15-5.08H8.43c-1 0-2.4.19-3.5 1.1-1.05.86-1.58 2.22-1.58 4.04v1.18c0 .5.4.93.87.93h16.23zm2.39 5.65c-.2-.25-.5-.38-.92-.38H2.62a.88.88 0 0 0-.76.35c-.24.34-.3.81-.2 1.1 1.19 4.14 5.46 6.91 10.61 6.91 5.21 0 9.62-2.83 10.72-6.9.12-.4.05-.81-.15-1.08zM8 8.39a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1zm8.67 0a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1z" fill="#929292" fill-rule="nonzero"
      />
      <text
        style={{
          transform: `translate(${x - columnWidth / 2 + hSpacing + paddingLeft + botIconWidth + textLeftPadding}px, ${y + vSpacing + fontSize + paddingTop}px)`,
          fill: 'rgba(39, 43, 48, .4)',
          fontSize: 12,
          userSelect: 'none',
        }}
      >
        {type === 'task' ? 'Task' : 'Condition'} {id}
      </text>
      <text
        style={{
          transform: `translate(${x - columnWidth / 2 + hSpacing + paddingLeft + botIconWidth + textLeftPadding}px, ${y + vSpacing + fontSize + fontSize + paddingTop + textVSpacing}px)`,
          fontWeight: 'bold',
          fill: '#3B424A',
          fontSize: 14,
          userSelect: 'none',
        }}
      >
        {['Collect records to process', 'Extract people'][id % 2]}
      </text>
      <path
        style={{
          transform: `translate(${x + columnWidth / 2 - 2 * hSpacing - iconDotsWidth / 2 - paddingLeft}px, ${y + vSpacing + taskHeigh / 2 - 11}px)`,
          fill: '#BCBCBC',
        }}
        d='M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z'
      />
    </g>
  )
})
