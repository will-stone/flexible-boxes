/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './../css/DomBox.css'

import cc from 'classcat'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import repeat from 'lodash/repeat'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  addBoxTo,
  deleteBox,
  editTitle,
  selectBox,
  updateTitle,
} from '../store/actions'

function DomBox({ path, indentLevel, box }) {
  const dispatch = useDispatch()
  const selectedBoxPath = useSelector((state) => state.ui.selectedBoxPath)

  const showEditTitle = false

  const isSelected = isEqual(path === selectedBoxPath)
  const isRootBox = isEmpty(path)

  return (
    <li
      className={cc([
        'DomBox',
        {
          'DomBox--isActive': isSelected,
        },
      ])}
      onClick={(event_) => {
        event_.stopPropagation()
        dispatch(selectBox(path))
      }}
    >
      <span className="DomBox__id">.</span>
      <span className="DomBox__indenter">{repeat('..', indentLevel)}</span>
      {showEditTitle && isSelected ? (
        <input
          autoFocus
          className="DomBox__titleInput"
          name="t"
          onChange={(event_) => dispatch(updateTitle(event_.target.value))}
          onKeyDown={(event_) => {
            if (event_.key === 'Enter') {
              dispatch(editTitle(path))
            }
          }}
          type="text"
          value={box.t}
        />
      ) : (
        <span className="DomBox__name">{box.t ? box.t : 'Box'}</span>
      )}

      <span className="DomBox__buttons">
        {!isRootBox && (
          <button
            className="DomBox__deleteButton DomBox__button"
            onClick={(event_) => {
              event_.stopPropagation()
              dispatch(deleteBox(path))
            }}
            type="button"
          >
            <i className="fa fa-trash" />
          </button>
        )}

        <button
          className="DomBox__renameButton DomBox__button"
          onClick={(event_) => {
            event_.stopPropagation()
            dispatch(editTitle(path))
          }}
          type="button"
        >
          <i className="fa fa-pencil" />
        </button>

        <button
          className="DomBox__addButton DomBox__button"
          onClick={(event_) => {
            event_.stopPropagation()
            dispatch(addBoxTo(path))
          }}
          type="button"
        >
          <i className="fa fa-plus" />
        </button>
      </span>
    </li>
  )
}

export default DomBox
