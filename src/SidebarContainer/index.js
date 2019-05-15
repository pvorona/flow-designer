import React from 'react'
import { observer } from 'mobx-react'
import { sidebarState } from '../Store'
import styles from './Sidebar.module.css'

const typeTitleMapping = {
  bot: 'Bot Task',
  human: 'Human Task',
  condition: 'Condition',
}

const SidebarContainerComponent = () => {
  return (
    <div className={`${styles.container} ${sidebarState.visible ? styles.visible : styles.hidden}`}>
      {sidebarState.visible ? (
        <div className={styles.header}>
          <div>
            <div className={styles.type}>{
              typeTitleMapping[sidebarState.focusedNode.type]
            }</div>
            <div className={styles.title}>
              Extract people, companies and countries {sidebarState.focusedNode.id}
            </div>
          </div>
          <svg
            onClick={sidebarState.hide}
            className={styles.closeIcon}
            width="24"
            height="24"
          >
            <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </div>
      ) : null}
    </div>
  )
}

export const SidebarContainer = observer(SidebarContainerComponent)