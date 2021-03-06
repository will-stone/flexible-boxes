import React, { Component } from 'react'
import cc from 'classcat'

import DomBox from './DomBox'

import './../css/Dom.css'

class Dom extends Component {
  render() {
    var boxes = this.props.boxes
    var selectedBoxId = this.props.selectedBoxId
    var selectBox = this.props.handleSelectBox
    var addBoxTo = this.props.handleAddBoxTo
    var deleteBox = this.props.handleDeleteBox
    var updateBox = this.props.updateBox

    function buildDom(id, indentMultiplier) {
      var output = null
      if (boxes[id].c) {
        output = []
        indentMultiplier++
        for (var i = 0; i < boxes[id].c.length; i++) {
          var childId = boxes[id].c[i]
          output.push(
            <DomBox
              key={childId}
              id={childId}
              parentId={id}
              selectedBoxId={selectedBoxId}
              indentLevel={indentMultiplier}
              selectBox={selectBox}
              box={boxes[childId]}
              addBoxTo={addBoxTo}
              deleteBox={deleteBox}
              updateBox={updateBox}
            />,
          )
          output.push.apply(output, buildDom(childId, indentMultiplier))
        }
      }
      return output
    }

    var domBoxes = [
      <DomBox
        key={1}
        id={1}
        parentId="null"
        selectedBoxId={selectedBoxId}
        indentLevel={0}
        selectBox={selectBox}
        box={boxes[1]}
        addBoxTo={addBoxTo}
        deleteBox={deleteBox}
        updateBox={updateBox}
      />,
    ]
    domBoxes.push.apply(domBoxes, buildDom(1, 0))

    return (
      <div className="Dom Pane__component">
        <h2 className="Pane__title">
          DOM{' '}
          <a
            className="Pane__titleButton button"
            href="/#~(1~())"
            onClick={() => selectBox(null)}
          >
            CLEAR
          </a>
        </h2>
        <ul className="Dom__boxes" onClick={() => selectBox(null)}>
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
              onClick={this.props.moveBox.bind(this, 'up')}
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
              onClick={this.props.moveBox.bind(this, 'down')}
            >
              DOWN
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default Dom
