import cc from 'classcat'
import React from 'react'
import { IBox } from '../model'

export const ToolbarIconButton = ({
  iconClass,
  isActive,
  isDefault,
  isDisabled,
  itemCount,
  label,
  onClick,
}: {
  iconClass: string
  isActive?: boolean
  isDefault?: boolean
  isDisabled?: boolean
  itemCount: number
  label: string
  onClick: () => void
}) => (
  <button
    className={cc(['Toolbar__iconRadioLabel', { 'Toolbar__iconRadioLabel--isActive': isActive }])}
    onClick={onClick}
    disabled={isDisabled}
  >
    <i className={`fbi ${iconClass}`}>
      <i className="fbi-items">
        {[...Array(itemCount)].map((_, i) => (
          <i key={i} />
        ))}
      </i>
      <span className={cc([{ Toolbar__default: isDefault }])}>{label}</span>
    </i>
  </button>
)
