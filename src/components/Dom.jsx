/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './../css/Dom.css'

import cc from 'classcat'
import isEmpty from 'lodash/isEmpty'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { clearBoxes, moveBox } from '../store/actions'
import DomBox from './DomBox'

const DomBoxes = ({ path, box, indentLevel }) => {
  return (
    <>
      <DomBox box={box} indentLevel={indentLevel} path={path} />
      {box.c &&
        !isEmpty(box.c) &&
        box.c.map((childBox, index) => (
          <DomBoxes
            key={[...path, index].join(',')}
            box={childBox}
            indentLevel={indentLevel + 1}
            path={[...path, index]}
          />
        ))}
    </>
  )
}

const Dom = () => {
  const dispatch = useDispatch()
  const boxes = useSelector((state) => state.ui.boxes)
  const selectedBoxPath = useSelector((state) => state.ui.selectedBoxPath)

  return (
    <div className="Dom Pane__component">
      <h2 className="Pane__title">
        DOM{' '}
        <button
          className="Pane__titleButton button"
          onClick={() => dispatch(clearBoxes())}
          type="button"
        >
          CLEAR
        </button>
      </h2>
      {/* eslint-disable-next-line no-alert */}
      <ul className="Dom__boxes" onClick={() => alert('not working')}>
        <DomBoxes box={boxes} indentLevel={0} path={[]} />
      </ul>
      {selectedBoxPath && selectedBoxPath !== 1 && (
        <div className="Dom__boxReorderButtons">
          <button
            className={cc([
              'button',
              {
                'Dom__boxReorderButton--isDisabled':
                  selectedBoxPath === boxes[1].c[0],
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
                  selectedBoxPath === boxes[1].c[boxes[1].c.length - 1],
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
