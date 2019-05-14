import React from 'react'

export const Defs = () =>
  <defs>
    <filter id="component-shadow" x="-30%" y="-30%" width="200%" height="200%">
      <feOffset result="offOut" in="SourceAlpha" dx="0" dy="2" />
      <feColorMatrix
        type="matrix"
        result="matrixOut"
        in="offOut"
        values="0 1 0 0 0
                0 1 0 0 0
                0 1 0 0 0
                0 1 0 0.2 0"
      />
      <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="3" />
      <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
    </filter>
  </defs>