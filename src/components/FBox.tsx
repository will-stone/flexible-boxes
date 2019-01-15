import cc from 'classcat'
import isEqual from 'lodash/isEqual'
import React, { Component } from 'react'
import { IBox } from '../model'
import './../css/FBox.css'
import { TSelectedBoxPath } from './App'

const FBox: React.FC<{
  box: IBox
  path: number[]
  selectedBoxPath: TSelectedBoxPath
  onSelectBox: (path: TSelectedBoxPath) => void
}> = props => {
  const boxStyle = {
    flexDirection: props.box.d ? props.box.d : 'row',
    flexWrap: props.box.w ? props.box.w : 'nowrap',
    flexGrow: props.box.g ? props.box.g : 0,
    flexShrink: props.box.s || props.box.s === 0 ? props.box.s : 1,
    flexBasis: props.box.b ? props.box.b : 'auto',
    justifyContent: props.box.jc ? props.box.jc : 'flex-start',
    alignContent: props.box.ac ? props.box.ac : 'stretch',
    alignItems: props.box.ai ? props.box.ai : 'stretch',
    alignSelf: props.box.as ? props.box.as : 'auto',
  }
  const isSelected = isEqual(props.path, props.selectedBoxPath)
  const isRootBox = isEqual(props.path, [0])
  return (
    <div
      className={cc([
        'FBox',
        {
          isSelected,
        },
        {
          isRootBox,
        },
      ])}
      onClick={e => {
        e.stopPropagation()
        props.onSelectBox(props.path)
      }}
      style={boxStyle}
    >
      {!isRootBox && (
        <div className="FBox__label">{!props.box.c && (props.box.t ? props.box.t : 'Box')}</div>
      )}
      {props.box.c &&
        props.box.c.map((box, i) => {
          const path = [...props.path, i]
          return (
            <FBox
              key={JSON.stringify(path)}
              box={box}
              path={path}
              selectedBoxPath={props.selectedBoxPath}
              onSelectBox={props.onSelectBox}
            />
          )
        })}
    </div>
  )
}

export default FBox
