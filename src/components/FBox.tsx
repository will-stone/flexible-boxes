import cc from 'classcat'
import React, { Component } from 'react'
import { IBox } from '../model'
import './../css/FBox.css'
import { TSelectedBoxPath } from './App'

class FBox extends Component<{
  boxes: IBox[]
  onSelectBox: (path: TSelectedBoxPath) => void
  selectedBoxPath: TSelectedBoxPath
  addBox?: any
  deleteBox?: any
  moveBox?: any
}> {
  public render() {
    // const thisBox = this.props.boxes[this.props.id]

    // Style of this box
    // var divStyle = {
    //   flexDirection: thisBox.d ? thisBox.d : 'row',
    //   flexWrap: thisBox.w ? thisBox.w : 'nowrap',
    //   flexGrow: thisBox.g ? thisBox.g : 0,
    //   flexShrink: thisBox.s || thisBox.s === 0 ? thisBox.s : 1,
    //   flexBasis: thisBox.b ? thisBox.b : 'auto',
    //   justifyContent: thisBox.jc ? thisBox.jc : 'flex-start',
    //   alignContent: thisBox.ac ? thisBox.ac : 'stretch',
    //   alignItems: thisBox.ai ? thisBox.ai : 'stretch',
    //   alignSelf: thisBox.as ? thisBox.as : 'auto' //,
    // }

    // Build JSX for all child boxes of this box
    // const childBoxesJSX = []
    // var inner = '' as any
    // if (thisBox.c) {
    //   for (let index = 0; index < thisBox.c.length; index++) {
    //     var childId = thisBox.c[index]
    //     childBoxesJSX.push(
    //       <FBox
    //         key={childId}
    //         boxes={this.props.boxes}
    //         id={childId}
    //         selectBox={this.props.selectBox}
    //         addBox={this.props.addBox}
    //         deleteBox={this.props.deleteBox}
    //         moveBox={this.props.moveBox}
    //         selectedBoxId={this.props.selectedBoxId}
    //       />
    //     )
    //   }
    // } else {
    //   inner = <div className="FBox__label">{thisBox.t ? thisBox.t : 'Box'}</div>
    // }

    return (
      <div />
      // <div
      //   className={cc([
      //     'FBox',
      //     { isActive: this.props.id === this.props.selectedBoxId },
      //     { isRootBox: this.props.id === 1 }
      //   ])}
      //   style={divStyle}
      //   onClick={e => {
      //     e.stopPropagation()
      //     this.props.selectBox(this.props.id)
      //   }}
      // >
      //   {childBoxesJSX}
      //   {inner}
      // </div>
    )
  }
}

export default FBox
