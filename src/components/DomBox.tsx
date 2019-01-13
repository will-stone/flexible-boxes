import cc from 'classcat'
import isEqual from 'lodash/isEqual'
import repeat from 'lodash/repeat'
import React, { Component, FormEvent } from 'react'
import { IBox, IFlattenedBox } from '../model'
import './../css/DomBox.css'
import { TSelectedBoxPath } from './App'

class DomBox extends Component<{
  box: IFlattenedBox
  onUpdateBox: (path: number[], key: keyof IBox, value: any) => void
  onSelectBox: (path: TSelectedBoxPath) => void
  onDeleteBox: (path: number[]) => void
  onAddBoxTo: (path: number[]) => void
  onToggleEditTitle: () => void
  selectedBoxPath: TSelectedBoxPath
  showEditTitle: boolean
}> {
  public setTitle = (e: React.FormEvent<HTMLInputElement>) => {
    this.props.onUpdateBox(this.props.box.path, 't', e.currentTarget.value)
  }

  public titleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      this.props.onToggleEditTitle()
    }
  }

  public render() {
    const isSelected = isEqual(this.props.box.path, this.props.selectedBoxPath)
    return (
      <li
        className={cc([
          'DomBox',
          {
            'DomBox--isActive': isSelected,
          },
        ])}
        onClick={e => {
          e.stopPropagation()
          this.props.onSelectBox(this.props.box.path)
        }}
      >
        <span className="DomBox__indenter">{repeat('..', this.props.box.path.length - 1)}</span>
        {this.props.showEditTitle && isSelected ? (
          <input
            autoFocus
            className="DomBox__titleInput"
            type="text"
            name="t"
            defaultValue={this.props.box.t}
            onChange={this.setTitle}
            onKeyDown={this.titleKeyDown}
            onClick={e => e.stopPropagation()}
            onFocus={e => e.currentTarget.select()}
          />
        ) : (
          <span className="DomBox__name">{this.props.box.t ? this.props.box.t : 'Box'}</span>
        )}

        {isSelected && (
          <span className="DomBox__buttons">
            {this.props.box.path.length !== 1 && (
              <button
                className="DomBox__deleteButton DomBox__button"
                onClick={e => {
                  e.stopPropagation()
                  this.props.onDeleteBox(this.props.box.path)
                }}
              >
                <i className="fa fa-trash" />
              </button>
            )}

            <button
              className="DomBox__renameButton DomBox__button"
              onClick={e => {
                e.stopPropagation()
                this.props.onToggleEditTitle()
              }}
            >
              <i className="fa fa-pencil" />
            </button>

            <button
              className="DomBox__addButton DomBox__button"
              onClick={e => {
                e.stopPropagation()
                this.props.onAddBoxTo(this.props.box.path)
              }}
            >
              <i className="fa fa-plus" />
            </button>
          </span>
        )}
      </li>
    )
  }

  // render() {
  //   return (
  //     <li
  // className={cc([
  //   'DomBox',
  //   {
  //     'DomBox--isActive': this.props.id === this.props.selectedBoxId
  //   }
  // ])}
  //       onClick={e => {
  //         e.stopPropagation()
  //         this.props.selectBox(this.props.id)
  //       }}
  //     >
  //       <span className="DomBox__id">{this.props.id}</span>
  //       <span className="DomBox__indenter">{repeat('..', this.props.indentLevel)}</span>
  //       {this.state.showEditTitle && this.props.id === this.props.selectedBoxId ? (
  //         <input
  //           autoFocus
  //           className="DomBox__titleInput"
  //           type="text"
  //           name="t"
  //           value={this.state.title}
  //           onChange={e => this.updateTitle(e)}
  //           onKeyDown={e => this.titleKeyDown(e)}
  //         />
  //       ) : (
  //         <span className="DomBox__name">{this.props.box.t ? this.props.box.t : 'Box'}</span>
  //       )}

  //       <span className="DomBox__buttons">
  //         {this.props.id !== 1 && (
  //           <button
  //             className="DomBox__deleteButton DomBox__button"
  //             onClick={e => {
  //               e.stopPropagation()
  //               this.props.deleteBox(this.props.id, this.props.parentId)
  //             }}
  //           >
  //             <i className="fa fa-trash" />
  //           </button>
  //         )}

  //         <button
  //           className="DomBox__renameButton DomBox__button"
  //           onClick={e => {
  //             e.stopPropagation()
  //             this.toggleEditTitle()
  //             this.props.selectBox(this.props.id)
  //           }}
  //         >
  //           <i className="fa fa-pencil" />
  //         </button>

  //         <button
  //           className="DomBox__addButton DomBox__button"
  //           onClick={e => {
  //             e.stopPropagation()
  //             this.props.addBoxTo(this.props.id)
  //           }}
  //         >
  //           <i className="fa fa-plus" />
  //         </button>
  //       </span>
  //     </li>
  //   )
  // }
}

export default DomBox
