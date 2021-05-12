/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './../css/FBox.css'

import cc from 'classcat'
import React from 'react'

const FBox = ({
  boxes,
  id,
  onAddBox,
  onDeleteBox,
  onMoveBox,
  onSelectBox,
  selectedBoxId,
}) => {
  const idAsNumber = Number.parseInt(id, 10)

  const thisBox = boxes[idAsNumber]

  // Style of this box
  const divStyle = {
    flexDirection: thisBox.d ? thisBox.d : 'row',
    flexWrap: thisBox.w ? thisBox.w : 'nowrap',
    flexGrow: thisBox.g ? thisBox.g : 0,
    flexShrink: thisBox.s || thisBox.s === 0 ? thisBox.s : 1,
    flexBasis: thisBox.b ? thisBox.b : 'auto',
    justifyContent: thisBox.jc ? thisBox.jc : 'flex-start',
    alignContent: thisBox.ac ? thisBox.ac : 'stretch',
    alignItems: thisBox.ai ? thisBox.ai : 'stretch',
    alignSelf: thisBox.as ? thisBox.as : 'auto',
  }

  // Build JSX for all child boxes of this box
  const childBoxesJSX = []
  let inner = ''
  if (thisBox.c) {
    for (let index = 0; index < thisBox.c.length; index = index + 1) {
      const childId = thisBox.c[index]
      childBoxesJSX.push(
        <FBox
          key={childId}
          boxes={boxes}
          id={childId}
          onAddBox={onAddBox}
          onDeleteBox={onDeleteBox}
          onMoveBox={onMoveBox}
          onSelectBox={onSelectBox}
          selectedBoxId={selectedBoxId}
        />,
      )
    }
  } else {
    inner = <div className="FBox__label">{thisBox.t ? thisBox.t : 'Box'}</div>
  }

  return (
    <div
      className={cc([
        'FBox',
        { isActive: idAsNumber === selectedBoxId },
        { isRootBox: idAsNumber === 1 },
      ])}
      onClick={(event_) => {
        event_.stopPropagation()
        onSelectBox(idAsNumber)
      }}
      style={divStyle}
    >
      {childBoxesJSX}
      {inner}
    </div>
  )
}

export default FBox