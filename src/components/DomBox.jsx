/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-set-state */
/* eslint-disable react/no-unsafe */
/* eslint-disable camelcase */
import './../css/DomBox.css'

import cc from 'classcat'
import repeat from 'lodash/repeat'
import React, { Component } from 'react'

class DomBox extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: props.box.t ? props.box.t : '',
      showEditTitle: false,
    }

    this.updateTitle = this.updateTitle.bind(this)
    this.titleKeyDown = this.titleKeyDown.bind(this)
    this.toggleEditTitle = this.toggleEditTitle.bind(this)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { showEditTitle } = this.state
    const { id } = this.props
    if (showEditTitle && id !== nextProps.selectedBoxId) {
      this.setState({
        showEditTitle: false,
      })
    }
  }

  updateTitle(changeEvent) {
    const { onUpdateBox, id } = this.props
    onUpdateBox(changeEvent, id)
    this.setState({
      title: changeEvent.target.value,
    })
  }

  titleKeyDown(event_) {
    if (event_.key === 'Enter') {
      this.toggleEditTitle()
    }
  }

  toggleEditTitle() {
    const { box } = this.props
    const { showEditTitle } = this.state
    this.setState({
      title: box.t ? box.t : '',
      showEditTitle: !showEditTitle,
    })
  }

  render() {
    const {
      box,
      id,
      indentLevel,
      onAddBoxTo,
      onDeleteBox,
      onSelectBox,
      parentId,
      selectedBoxId,
    } = this.props
    const { showEditTitle, title } = this.state

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
          onSelectBox(id)
        }}
      >
        <span className="DomBox__id">{id}</span>
        <span className="DomBox__indenter">{repeat('..', indentLevel)}</span>
        {showEditTitle && id === selectedBoxId ? (
          <input
            autoFocus
            className="DomBox__titleInput"
            name="t"
            onChange={(event_) => this.updateTitle(event_)}
            onKeyDown={(event_) => this.titleKeyDown(event_)}
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
                onDeleteBox(id, parentId)
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
              this.toggleEditTitle()
              onSelectBox(id)
            }}
            type="button"
          >
            <i className="fa fa-pencil" />
          </button>

          <button
            className="DomBox__addButton DomBox__button"
            onClick={(event_) => {
              event_.stopPropagation()
              onAddBoxTo(id)
            }}
            type="button"
          >
            <i className="fa fa-plus" />
          </button>
        </span>
      </li>
    )
  }
}

export default DomBox
