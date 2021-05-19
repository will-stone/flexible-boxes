/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './../css/FBox.css'

import cc from 'classcat'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getBoxAt } from '../lib/getBoxAt'
import { selectBox } from '../store/actions'

const FBox = ({ path }) => {
  const dispatch = useDispatch()
  const boxes = useSelector((state) => state.ui.boxes)
  const selectedBoxPath = useSelector((state) => state.ui.selectedBoxPath)

  const thisBox = getBoxAt(boxes, path)

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
      childBoxesJSX.push(
        <FBox key={[...path, index].join(',')} path={[...path, index]} />,
      )
    }
  } else {
    inner = <div className="FBox__label">{thisBox.t ? thisBox.t : 'Box'}</div>
  }

  return (
    <div
      className={cc([
        'FBox',
        { isActive: isEqual(path, selectedBoxPath) },
        { isRootBox: isEmpty(path) },
      ])}
      onClick={(event_) => {
        event_.stopPropagation()
        dispatch(selectBox(path))
      }}
      style={divStyle}
    >
      {childBoxesJSX}
      {inner}
    </div>
  )
}

export default FBox
