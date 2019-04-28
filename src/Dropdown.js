import React from 'react'

export const Dropdown = ({ isOpen }) =>
  <div
    style={{
      width: 200,
      boxShadow: '0 2px 6px 0 rgba(200,196,187,0.5)',
      borderRadius: 2,
      background: 'white',
    }}
  >
    <div className='DropdownOption'>Task</div>
    <div className='DropdownOption'>Condition</div>
  </div>
