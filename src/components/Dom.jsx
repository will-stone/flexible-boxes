/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable unicorn/no-null */
import './../css/Dom.css'

import cc from 'classcat'
import React from 'react'

import DomBox from './DomBox'

const Dom = ({
  onUpdateBox,
  onDeleteBox,
  onAddBoxTo,
  onSelectBox,
  selectedBoxId,
  onMoveBox,
  boxes,
}) => {
  const buildDom = (id, indentMultiplier = 0) => {
    let output = null
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
            onAddBoxTo={onAddBoxTo}
            onDeleteBox={onDeleteBox}
            onSelectBox={onSelectBox}
            onUpdateBox={onUpdateBox}
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
      onAddBoxTo={onAddBoxTo}
      onDeleteBox={onDeleteBox}
      onSelectBox={onSelectBox}
      onUpdateBox={onUpdateBox}
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
          onClick={() => onSelectBox(null)}
        >
          CLEAR
        </a>
      </h2>
      <ul className="Dom__boxes" onClick={() => onSelectBox(null)}>
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
            onClick={() => onMoveBox('up')}
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
            onClick={() => onMoveBox('down')}
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
