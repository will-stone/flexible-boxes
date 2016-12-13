import React, { Component } from 'react';
import classnames from 'classnames';

import './../css/FBox.css';

class FBox extends Component {
  render() {

    var boxes = this.props.boxes;
    var id = parseInt(this.props.id, 10);

    var thisBox = boxes[id];

    // Style of this box
    var divStyle = {
      flexDirection: thisBox.d ? thisBox.d : 'row',
      flexWrap: thisBox.w ? thisBox.w : 'nowrap',
      flexGrow: thisBox.g ? thisBox.g : 0,
      flexShrink: thisBox.s || thisBox.s === 0 ? thisBox.s : 1,
      flexBasis: thisBox.b ? thisBox.b : 'auto',
      justifyContent: thisBox.jc ? thisBox.jc : 'flex-start',
      alignContent: thisBox.ac ? thisBox.ac : 'stretch',
      alignItems: thisBox.ai ? thisBox.ai : 'stretch',
      alignSelf: thisBox.as ? thisBox.as : 'auto'//,
    };

    // Build JSX for all child boxes of this box
    var childBoxesJSX = [];
    var inner = '';
    if (thisBox.c) {
      for (let index = 0; index < thisBox.c.length; index++) {
        var childId = thisBox.c[index];
        childBoxesJSX.push(
          <FBox
            key={childId}
            boxes={boxes}
            id={childId}
            selectBox={this.props.selectBox}
            addBox={this.props.addBox}
            deleteBox={this.props.deleteBox}
            moveBox={this.props.moveBox}
            selectedBoxId={this.props.selectedBoxId}
            />
        );
      }
    }
    else {
      inner = <div className="FBox__label">{thisBox.t ? thisBox.t : 'Box'}</div>
    }

    return (
      <div
        className={classnames(
          'FBox',
          {'isActive': id === this.props.selectedBoxId},
          {'isRootBox': id === 1}
        )}
        style={divStyle}
        onClick={(e) => { e.stopPropagation(); this.props.selectBox(id); } }
        >
        {childBoxesJSX}
        {inner}
      </div>
    );

  }
}

export default FBox;
