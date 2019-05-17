import React from 'react'
import { observer } from 'mobx-react'
import { sidebarState } from '../Store'
import styles from './Sidebar.module.css'

const typeTitleMapping = {
  bot: 'Bot Task',
  human: 'Human Task',
  condition: 'Condition',
}

const Section = (props) =>
  <div style={{ marginBottom: 20 }} {...props} />

const SidebarContainerComponent = () => {
  function deleteComponent () {
    sidebarState.hide()
    sidebarState.focusedNode.type = 'placeholder'
    sidebarState.focusedNode.left = undefined
    sidebarState.focusedNode.right = undefined
    window.kek()
  }

  return (
    <div className={`${styles.container} ${sidebarState.visible ? styles.visible : styles.hidden}`}>
      {sidebarState.visible ? (
        <React.Fragment>
          <div className={styles.header}>
            <div style={{ width: '100%' }}>
              <div className={styles.type}>{
                typeTitleMapping[sidebarState.focusedNode.type]
              }</div>
              <input
                className={styles.title}
                value={sidebarState.focusedNode.title}
                onChange={e => sidebarState.focusedNode.title = e.target.value}
              />
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
          <Section>
            <div className={styles.label}>Parameter 1</div>
            <input
              className={styles.param}
              defaultValue='Value 1'
            />
          </Section>
          <Section>
            <div className={styles.label}>Parameter 2</div>
            <input
              className={styles.param}
              defaultValue='Value 2'
            />
          </Section>
          <Section>
            <div className={styles.label}>Parameter 3</div>
            <input
              className={styles.param}
              defaultValue='Value 3'
            />
          </Section>
          <Section>
            <div className={styles.interface}>
              Input
            </div>
            <span className={styles.interfaceValue}>
              INPUT VALUE 1
            </span>
            <div className={styles.interface}>
              Output
            </div>
            <span className={styles.interfaceValue}>
              OUTPUT VALUE 1
            </span>
          </Section>
          <div className={styles.footer}>
            <svg
              onClick={deleteComponent}
              className={styles.deleteIcon}
              width="24"
              height="24"
            >
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
            </svg>
          </div>
        </React.Fragment>
      ) : null}
    </div>
  )
}

export const SidebarContainer = observer(SidebarContainerComponent)