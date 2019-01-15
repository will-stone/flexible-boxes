import cc from 'classcat'
import isEqual from 'lodash/isEqual'
import React, { Component } from 'react'
import '../css/Dom.css'
import { IBox } from '../model'
import { flattenBoxes } from '../utils/boxes.flatten'
import { TSelectedBoxPath } from './App'
import DomBox from './DomBox'

const Dom: React.FC<{
  boxes: IBox[]
  selectedBoxPath: TSelectedBoxPath
  showEditTitle: boolean
  onSelectBox: (path: TSelectedBoxPath) => void
  onAddBoxTo: (path: number[]) => void
  onDeleteBox: (path: number[]) => void
  onUpdateBox: (path: number[], key: keyof IBox, value: any) => void
  onMoveBox: (direction: 'up' | 'down') => void
  onToggleEditTitle: () => void
  onSetBoxes: (boxes: IBox[]) => void
}> = props => {
  return (
    <div className="Dom Pane__component" data-testid="Dom">
      <h2 className="Pane__title">
        DOM{' '}
        <button className="Pane__titleButton button" onClick={() => props.onSetBoxes([{}])}>
          CLEAR
        </button>
      </h2>
      <ul className="Dom__boxes" onClick={() => props.onSelectBox(undefined)}>
        {flattenBoxes(props.boxes).map((box, i) => (
          <DomBox
            key={i}
            box={box}
            onUpdateBox={props.onUpdateBox}
            onSelectBox={props.onSelectBox}
            onDeleteBox={props.onDeleteBox}
            onAddBoxTo={props.onAddBoxTo}
            selectedBoxPath={props.selectedBoxPath}
            showEditTitle={props.showEditTitle}
            onToggleEditTitle={props.onToggleEditTitle}
          />
        ))}
      </ul>
      {props.selectedBoxPath && props.selectedBoxPath.length !== 1 && (
        <div className="Dom__boxReorderButtons">
          <button
            className={cc([
              'button',
              {
                'Dom__boxReorderButton--isDisabled': isEqual(props.selectedBoxPath, [0, 0]),
              },
            ])}
            onClick={() => props.onMoveBox('up')}
          >
            UP
          </button>
          <button
            className={cc([
              'button',
              {
                'Dom__boxReorderButton--isDisabled':
                  props.boxes[0].c &&
                  isEqual(props.selectedBoxPath, [0, props.boxes[0].c.length - 1]),
              },
            ])}
            onClick={() => props.onMoveBox('down')}
          >
            DOWN
          </button>
        </div>
      )}
    </div>
  )
}

export default Dom
