import React from 'react'
import { zoomState } from '../Store'
import styles from './ZoomControls.module.css'

export const ZoomControls = () =>
  <div className={styles.container}>
    <button
      onClick={zoomState.zoomIn}
      className={styles.zoomIn}
    >+</button>
    <button
      onClick={zoomState.zoomOut}
      className={styles.zoomOut}
    >-</button>
  </div>