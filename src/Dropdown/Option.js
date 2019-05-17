import React from 'react'
import styles from './Option.module.css'

export function Option ({ onClick, active, ...props }) {
  return (
    <div
      {...props}
      className={`${styles.option} ${active ? styles.active : ''}`}
      onClick={(e) => {
        e.stopPropagation()
        onClick && onClick(e)
      }}
    />
  )
}

export const Description = (props) =>
  <div className={styles.description} {...props} />