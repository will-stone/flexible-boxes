import cc from 'classcat'
import repeat from 'lodash/repeat'
import React, { Component } from 'react'

import './../css/DomBox.css'

class DomBox extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: this.props.box.t ? this.props.box.t : '',
      showEditTitle: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.showEditTitle && this.props.id !== nextProps.selectedBoxId) {
      this.setState({
        showEditTitle: false
      })
    }
  }

  updateTitle(changeEvent) {
    this.props.updateBox(changeEvent, this.props.id)
    this.setState({
      title: changeEvent.target.value
    })
  }

  titleKeyDown(e) {
    if (e.key === 'Enter') {
      this.toggleEditTitle()
    }
  }

  toggleEditTitle() {
    this.setState({
      title: this.props.box.t ? this.props.box.t : '',
      showEditTitle: !this.state.showEditTitle
    })
  }

  render() {
    return (
      <li
        className={cc([
          'DomBox',
          {
            'DomBox--isActive': this.props.id === this.props.selectedBoxId
          }
        ])}
        onClick={e => {
          e.stopPropagation()
          this.props.selectBox(this.props.id)
        }}
      >
        <span className="DomBox__id">{this.props.id}</span>
        <span className="DomBox__indenter">
          {repeat('..', this.props.indentLevel)}
        </span>
        {this.state.showEditTitle &&
        this.props.id === this.props.selectedBoxId ? (
          <input
            autoFocus
            className="DomBox__titleInput"
            type="text"
            name="t"
            value={this.state.title}
            onChange={e => this.updateTitle(e)}
            onKeyDown={e => this.titleKeyDown(e)}
          />
        ) : (
          <span className="DomBox__name">
            {this.props.box.t ? this.props.box.t : 'Box'}
          </span>
        )}

        <span className="DomBox__buttons">
          {this.props.id !== 1 && (
            <button
              className="DomBox__deleteButton DomBox__button"
              onClick={e => {
                e.stopPropagation()
                this.props.deleteBox(this.props.id, this.props.parentId)
              }}
            >
              <i className="fa fa-trash" />
            </button>
          )}

          <button
            className="DomBox__renameButton DomBox__button"
            onClick={e => {
              e.stopPropagation()
              this.toggleEditTitle()
              this.props.selectBox(this.props.id)
            }}
          >
            <i className="fa fa-pencil" />
          </button>

          <button
            className="DomBox__addButton DomBox__button"
            onClick={e => {
              e.stopPropagation()
              this.props.addBoxTo(this.props.id)
            }}
          >
            <i className="fa fa-plus" />
          </button>
        </span>
      </li>
    )
  }
}

export default DomBox
