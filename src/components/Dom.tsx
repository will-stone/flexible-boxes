import cc from 'classcat'
import isEqual from 'lodash/isEqual'
import React, { Component } from 'react'
import { TSelectedBoxPath } from '../containers/App'
import '../css/Dom.css'
import { IBox } from '../model'
import { flattenBoxes } from '../utils/boxes.flatten'
import DomBox from './DomBox'

class Dom extends Component<{
  boxes: [IBox]
  selectedBoxPath: TSelectedBoxPath
  showEditTitle: boolean
  onSelectBox: (path: TSelectedBoxPath) => void
  onAddBoxTo: (path: number[]) => void
  onDeleteBox: (path: number[]) => void
  onUpdateBox: (path: number[], key: keyof IBox, value: any) => void
  onMoveBox: (direction: 'up' | 'down') => void
  onToggleEditTitle: () => void
}> {
  render() {
    return (
      <div className="Dom Pane__component">
        <h2 className="Pane__title">
          DOM{' '}
          <a className="Pane__titleButton button" href="/#~(~())">
            CLEAR
          </a>
        </h2>
        <ul className="Dom__boxes" onClick={() => this.props.onSelectBox(undefined)}>
          {flattenBoxes(this.props.boxes).map((box, i) => (
            <DomBox
              key={i}
              box={box}
              onUpdateBox={this.props.onUpdateBox}
              onSelectBox={this.props.onSelectBox}
              onDeleteBox={this.props.onDeleteBox}
              onAddBoxTo={this.props.onAddBoxTo}
              selectedBoxPath={this.props.selectedBoxPath}
              showEditTitle={this.props.showEditTitle}
              onToggleEditTitle={this.props.onToggleEditTitle}
            />
          ))}
        </ul>
        {this.props.selectedBoxPath && this.props.selectedBoxPath.length !== 1 && (
          <div className="Dom__boxReorderButtons">
            <button
              className={cc([
                'button',
                {
                  'Dom__boxReorderButton--isDisabled': isEqual(this.props.selectedBoxPath, [0, 0])
                }
              ])}
              onClick={() => this.props.onMoveBox('up')}
            >
              UP
            </button>
            <button
              className={cc([
                'button',
                {
                  'Dom__boxReorderButton--isDisabled':
                    this.props.boxes[0].c &&
                    isEqual(this.props.selectedBoxPath, [0, this.props.boxes[0].c.length - 1])
                }
              ])}
              onClick={() => this.props.onMoveBox('down')}
            >
              DOWN
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default Dom
