import cc from 'classcat'
import React from 'react'

export const ToolbarIcon = ({
  name,
  itemCount,
  isDefault,
}: {
  name: string
  itemCount: number
  isDefault?: boolean
}) => (
  <i className={`fbi fbi-${name.toLowerCase()}`}>
    <i className="fbi-items">
      {[...Array(itemCount)].map((_, i) => (
        <i key={i} />
      ))}
    </i>
    <span className={cc([{ Toolbar__default: isDefault }])}>{name}</span>
  </i>
)
