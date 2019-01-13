import cc from 'classcat'
import isEqual from 'lodash/isEqual'
import React, { Component } from 'react'
import { IBox } from '../model'
import './../css/FBox.css'
import { TSelectedBoxPath } from './App'

class FBox extends Component<{
  box: IBox
  path: number[]
  selectedBoxPath: TSelectedBoxPath
  onSelectBox: (path: TSelectedBoxPath) => void
}> {
  public render() {
    const boxStyle = {
      flexDirection: this.props.box.d ? this.props.box.d : 'row',
      flexWrap: this.props.box.w ? this.props.box.w : 'nowrap',
      flexGrow: this.props.box.g ? this.props.box.g : 0,
      flexShrink: this.props.box.s || this.props.box.s === 0 ? this.props.box.s : 1,
      flexBasis: this.props.box.b ? this.props.box.b : 'auto',
      justifyContent: this.props.box.jc ? this.props.box.jc : 'flex-start',
      alignContent: this.props.box.ac ? this.props.box.ac : 'stretch',
      alignItems: this.props.box.ai ? this.props.box.ai : 'stretch',
      alignSelf: this.props.box.as ? this.props.box.as : 'auto',
    }

    const isSelected = isEqual(this.props.path, this.props.selectedBoxPath)
    const isRootBox = isEqual(this.props.path, [0])

    return (
      <div
        className={cc(['FBox', { isSelected }, { isRootBox }])}
        onClick={e => {
          e.stopPropagation()
          this.props.onSelectBox(this.props.path)
        }}
        style={boxStyle}
      >
        {!isRootBox && (
          <div className="FBox__label">{this.props.box.t ? this.props.box.t : 'Box'}</div>
        )}
        {this.props.box.c &&
          this.props.box.c.map((box, i) => {
            const path = [...this.props.path, i]
            return (
              <FBox
                key={JSON.stringify(path)}
                box={box}
                path={path}
                selectedBoxPath={this.props.selectedBoxPath}
                onSelectBox={this.props.onSelectBox}
              />
            )
          })}
      </div>
    )
  }
}

export default FBox
