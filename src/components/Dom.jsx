/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './../css/Dom.css'

import cc from 'classcat'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { moveBox } from '../store/actions'
import DomBox from './DomBox'

const Dom = () => {
  const dispatch = useDispatch()
  const boxes = useSelector((state) => state.ui.boxes)
  const selectedBoxId = useSelector((state) => state.ui.selectedBoxId)

  const buildDom = (id, indentMultiplier = 0) => {
    let output
    if (boxes[id].c) {
      output = []
      const indentMultiplierUpdated = indentMultiplier + 1
      for (let index = 0; index < boxes[id].c.length; index = index + 1) {
        const childId = boxes[id].c[index]
        output.push(
          <DomBox
            key={childId}
            box={boxes[childId]}
            id={childId}
            indentLevel={indentMultiplierUpdated}
            parentId={id}
            selectedBoxId={selectedBoxId}
          />,
          buildDom(childId, indentMultiplierUpdated),
        )
      }
    }

    return output
  }

  const domBoxes = [
    <DomBox
      key={1}
      box={boxes[1]}
      id={1}
      indentLevel={0}
      parentId="null"
      selectedBoxId={selectedBoxId}
    />,
    buildDom(1, 0),
  ]

  return (
    <div className="Dom Pane__component">
      <h2 className="Pane__title">
        DOM{' '}
        <a
          className="Pane__titleButton button"
          href="/#~(1~())"
          // eslint-disable-next-line no-alert
          onClick={() => alert('not working')}
        >
          CLEAR
        </a>
      </h2>
      {/* eslint-disable-next-line no-alert */}
      <ul className="Dom__boxes" onClick={() => alert('not working')}>
        {domBoxes}
      </ul>
      {selectedBoxId && selectedBoxId !== 1 && (
        <div className="Dom__boxReorderButtons">
          <button
            className={cc([
              'button',
              {
                'Dom__boxReorderButton--isDisabled':
                  selectedBoxId === boxes[1].c[0],
              },
            ])}
            onClick={() => dispatch(moveBox('up'))}
            type="button"
          >
            UP
          </button>
          <button
            className={cc([
              'button',
              {
                'Dom__boxReorderButton--isDisabled':
                  selectedBoxId === boxes[1].c[boxes[1].c.length - 1],
              },
            ])}
            onClick={() => dispatch(moveBox('down'))}
            type="button"
          >
            DOWN
          </button>
        </div>
      )}
    </div>
  )
}

export default Dom
