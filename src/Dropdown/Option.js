import React from 'react'
import styles from './Option.module.css'

export function Option ({ onClick, ...props }) {
  return (
    <div
      {...props}
      className={styles.option}
      onClick={(e) => {
        e.stopPropagation()
        onClick && onClick(e)
      }}
    />
  )
}