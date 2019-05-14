import React, { useEffect } from 'react'
import styles from './Dropdown.module.css'

export const Dropdown = (props) =>
  <div
    className={styles.dropdown}
    onMouseDown={(e) => {
      e.stopPropagation()
    }}
    {...props}
  />

export const AutoHideDropdown = (props) => {
  useEffect(() => {
    window.addEventListener('mousedown', hideDropdown)

    return () => {
      window.removeEventListener('mousedown', hideDropdown)
    }
  }, [])

  function hideDropdown () {
    window.dropdownState.hide()
  }

  return (
    <Dropdown {...props} />
  )
}