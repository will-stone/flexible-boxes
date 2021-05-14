/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './../css/DomBox.css'

import cc from 'classcat'
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

function DomBox({ id, indentLevel, title, box, parentId }) {
  const dispatch = useDispatch()
  const selectedBoxId = useSelector((state) => state.ui.selectedBoxId)

  const showEditTitle = false

  return (
    <li
      className={cc([
        'DomBox',
        {
          'DomBox--isActive': id === selectedBoxId,
        },
      ])}
      onClick={(event_) => {
        event_.stopPropagation()
        dispatch(selectBox(id))
      }}
    >
      <span className="DomBox__id">{id}</span>
      <span className="DomBox__indenter">{repeat('..', indentLevel)}</span>
      {showEditTitle && id === selectedBoxId ? (
        <input
          autoFocus
          className="DomBox__titleInput"
          name="t"
          onChange={(event_) => dispatch(updateTitle(event_.target.value))}
          onKeyDown={(event_) => {
            if (event_.key === 'Enter') {
              dispatch(editTitle(id))
            }
          }}
          type="text"
          value={title}
        />
      ) : (
        <span className="DomBox__name">{box.t ? box.t : 'Box'}</span>
      )}

      <span className="DomBox__buttons">
        {id !== 1 && (
          <button
            className="DomBox__deleteButton DomBox__button"
            onClick={(event_) => {
              event_.stopPropagation()
              dispatch(deleteBox(id, parentId))
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
            dispatch(editTitle(id))
          }}
          type="button"
        >
          <i className="fa fa-pencil" />
        </button>

        <button
          className="DomBox__addButton DomBox__button"
          onClick={(event_) => {
            event_.stopPropagation()
            dispatch(addBoxTo(id))
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
