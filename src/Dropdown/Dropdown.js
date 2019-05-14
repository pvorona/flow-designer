import React, { useEffect } from 'react'
import { dropdownState } from '../Store'
import styles from './Dropdown.module.css'

function stopPropagation (e) {
  e.stopPropagation()
}

export const Dropdown = (props) =>
  <div
    className={styles.dropdown}
    onMouseDown={stopPropagation}
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
    dropdownState.hide()
  }

  return (
    <Dropdown {...props} />
  )
}