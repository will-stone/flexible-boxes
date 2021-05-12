/* eslint-disable react/no-danger */
/* eslint-disable no-console */
/* eslint-disable unicorn/no-null */
/* eslint-disable react/no-set-state */
/* eslint-disable max-depth */
import './../css/App.css'
import './../css/button.css'
import './../css/Pane.css'

import cc from 'classcat'
import update from 'immutability-helper'
import jsurl from 'jsurl'
import React, { Component } from 'react'
import SplitPane from 'react-split-pane'

import Css from '../components/Css'
import Dom from '../components/Dom'
import FBox from '../components/FBox'
import Html from '../components/Html'
import Sitebar from '../components/Sitebar'
import Toolbar from '../components/Toolbar'

// eslint-disable-next-line react/no-unsafe
class App extends Component {
  constructor() {
    super()

    this.state = {
      screenWarningHidden: false,
      selectedBoxId: null,
      boxes: {
        // default layout
        1: {
          c: [2, 3, 4],
        },
        2: {},
        3: {},
        4: {},
      },
    }

    this.sanitiseBoxes = this.sanitiseBoxes.bind(this)
    this.handleSelectBox = this.handleSelectBox.bind(this)
    this.handleUpdateBox = this.handleUpdateBox.bind(this)
    this.handleNudge = this.handleNudge.bind(this)
    this.handleAddBoxTo = this.handleAddBoxTo.bind(this)
    this.handleReorderBox = this.handleReorderBox.bind(this)
    this.handleDeleteBox = this.handleDeleteBox.bind(this)
    this.handleResetBox = this.handleResetBox.bind(this)
    this.urlToBoxes = this.urlToBoxes.bind(this)
    this.handleRemoveScreenWarning = this.handleRemoveScreenWarning.bind(this)
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    this.urlToBoxes()
    window.addEventListener(
      'hashchange',
      () => {
        this.urlToBoxes()
      },
      false,
    )
  }

  sanitiseBoxes(boxes) {
    let counter = 1
    for (const [compId, box] of Object.entries(boxes)) {
      if (box && Number.parseInt(compId, 10) === counter) {
        // second clause is dirty check for corrupt boxes; checks box IDs start at 1 and are squential.
        for (const key of Object.keys(boxes[compId])) {
          if (boxes[compId][key]) {
            const value = boxes[compId][key]
            if (value === '') {
              // remove an empty property
              delete boxes[compId][key]
            } else {
              switch (key) {
                // title
                case 't':
                  // spaces to underscores
                  boxes[compId].t = boxes[compId].t.replace(' ', '_')
                  break

                // direction
                case 'd':
                  if (boxes[compId].d !== 'column') {
                    delete boxes[compId].d
                  }

                  break

                // wrap
                case 'w':
                  if (boxes[compId].w !== 'wrap') {
                    delete boxes[compId].w
                  }

                  break

                // grow
                case 'g':
                  if (Number.parseInt(boxes[compId].g, 10) === 0) {
                    delete boxes[compId].g
                  }

                  break

                // shrink
                case 's':
                  if (Number.parseInt(boxes[compId].s, 10) === 1) {
                    delete boxes[compId].s
                  }

                  break

                // basis
                case 'b':
                  if (boxes[compId].b === 'auto') {
                    delete boxes[compId].b
                  }

                  break

                // justify-content
                case 'jc':
                  if (boxes[compId].jc === 'flex-start') {
                    delete boxes[compId].jc
                  }

                  break

                // align-content
                case 'ac':
                  if (boxes[compId].ac === 'stretch') {
                    delete boxes[compId].ac
                  }

                  break

                // align-items
                case 'ai':
                  if (boxes[compId].ai === 'stretch') {
                    delete boxes[compId].ai
                  }

                  break

                // align-items
                case 'as':
                  if (boxes[compId].as === 'auto') {
                    delete boxes[compId].as
                  }

                  break

                // children
                case 'c':
                  // remove empty child object
                  if (
                    typeof value === 'object' &&
                    Object.keys(value).length === 0
                  ) {
                    delete boxes[compId].c
                  }

                  break

                default:
                  delete boxes[compId][key]
                  break
              }
            }
          }
        }

        counter = counter + 1
      } else {
        // corrupt boxes
        console.log('Coponents are corrupt, resetting.')
        // eslint-disable-next-line react/destructuring-assignment, prefer-destructuring, no-param-reassign
        boxes = this.state.boxes
        break
      }
    }

    return boxes
  }

  handleSelectBox(id) {
    this.setState({ selectedBoxId: id })
  }

  // TODO: merge this with nudge?
  handleUpdateBox(changeEvent, compId) {
    const { name } = changeEvent.target
    const { value } = changeEvent.target
    const { boxes } = this.state
    window.location.hash = jsurl.stringify(
      this.sanitiseBoxes(
        update(boxes, {
          [compId]: {
            [name]: { $set: value },
          },
        }),
      ),
    )
  }

  handleNudge(compId, name, updatedValue) {
    const { boxes } = this.state
    this.setState({
      boxes: update(boxes, {
        [compId]: {
          [name]: { $set: updatedValue },
        },
      }),
    })
    window.location.hash = jsurl.stringify(
      this.sanitiseBoxes(
        update(boxes, {
          [compId]: {
            [name]: { $set: updatedValue },
          },
        }),
      ),
    )
  }

  handleAddBoxTo(id) {
    const { boxes } = this.state
    let largestBoxId = 0

    // find next box id
    for (const box in boxes) {
      if (boxes[box] && box > largestBoxId) {
        largestBoxId = largestBoxId + 1
      }
    }

    // this is the new id
    largestBoxId = largestBoxId + 1

    if (boxes[id].c) {
      boxes[id].c.push(largestBoxId)
    } else {
      boxes[id].c = [largestBoxId]
    }

    boxes[largestBoxId] = {}

    window.location.hash = jsurl.stringify(boxes)
  }

  handleReorderBox(direction) {
    const { boxes } = this.state
    const { selectedBoxId } = this.state

    const findParentOf = (id) => {
      for (const boxId in boxes) {
        if (boxes[boxId]) {
          const box = boxes[boxId]
          if (box.c && box.c.includes(Number.parseInt(id, 10))) {
            return boxId
          }
        }
      }
    }

    const parentId = findParentOf(selectedBoxId)
    const parentIdOfParent = findParentOf(parentId)
    let indexOfParentInParent

    if (parentIdOfParent) {
      indexOfParentInParent = boxes[parentIdOfParent].c.indexOf(
        Number.parseInt(parentId, 10),
      )
    }

    const indexOfSelected = boxes[parentId].c.indexOf(selectedBoxId)

    // Remove selected from children array
    const removeSelected = () => {
      boxes[parentId].c.splice(indexOfSelected, 1)
    }

    // Direction up and NOT currently at beginning of children array
    if (direction === 'up' && indexOfSelected !== 0) {
      // if box above has children, move selected box into the end of that array
      if (boxes[boxes[parentId].c[indexOfSelected - 1]].c) {
        removeSelected()
        boxes[boxes[parentId].c[indexOfSelected - 1]].c.push(selectedBoxId)
        // else swap selected with box above it in array
      } else {
        ;[
          boxes[parentId].c[indexOfSelected],
          boxes[parentId].c[indexOfSelected - 1],
        ] = [
          boxes[parentId].c[indexOfSelected - 1],
          boxes[parentId].c[indexOfSelected],
        ]
      }
    } else if (direction === 'up' && indexOfSelected === 0) {
      // Direction up and currently at beginning of children array, move to parent
      removeSelected()
      boxes[parentIdOfParent].c.splice(indexOfParentInParent, 0, selectedBoxId)
    } else if (
      direction === 'down' &&
      indexOfSelected !== boxes[parentId].c.length - 1
    ) {
      // Direction down and NOT currently at end of children array
      // if box below has children, move selected box into beginning of that array
      if (boxes[boxes[parentId].c[indexOfSelected + 1]].c) {
        removeSelected()
        boxes[boxes[parentId].c[indexOfSelected]].c.unshift(selectedBoxId)
        // else swap selected with box below it in array
      } else {
        ;[
          boxes[parentId].c[indexOfSelected],
          boxes[parentId].c[indexOfSelected + 1],
        ] = [
          boxes[parentId].c[indexOfSelected + 1],
          boxes[parentId].c[indexOfSelected],
        ]
      }
    } else if (
      direction === 'down' &&
      indexOfSelected === boxes[parentId].c.length - 1
    ) {
      // Direction down and currently at end of children array, move to parent
      removeSelected()
      boxes[parentIdOfParent].c.splice(
        indexOfParentInParent + 1,
        0,
        selectedBoxId,
      )
    }

    window.location.hash = jsurl.stringify(boxes)
  }

  handleDeleteBox(id, parentId) {
    const { boxes } = this.state
    const selectedBoxChildren = boxes[id].c
    let { selectedBoxId } = this.state

    // delete all children of box
    if (selectedBoxChildren) {
      for (const child of selectedBoxChildren) {
        // deselect
        if (selectedBoxId === child) {
          selectedBoxId = null
        }

        delete boxes[child]
      }
    }

    // delete selected box
    delete boxes[id]

    // deselect if this id
    if (selectedBoxId === id) {
      selectedBoxId = null
    }

    // find link to id in parent's' children array and remove it
    const indexOfChildInParent = boxes[parentId].c.indexOf(id)
    const parentsChildrenCount = boxes[parentId].c.length
    if (parentsChildrenCount === 1) {
      // if only child, remove children (c) property from parent
      delete boxes[parentId].c
    } else {
      // else just remove the child if present
      boxes[parentId].c.splice(indexOfChildInParent, 1)
    }

    // Rebase box ids
    let idCounter = 1
    for (let boxId in boxes) {
      if (boxes[boxId]) {
        boxId = Number.parseInt(boxId, 10)
        if (boxId !== idCounter && boxId !== 1) {
          boxes[idCounter] = boxes[boxId]
          delete boxes[boxId]

          // replace reference to child in parent's children array
          for (const parentBoxId in boxes) {
            if (
              boxes[parentBoxId] &&
              boxes[parentBoxId].c &&
              boxes[parentBoxId].c.includes(boxId)
            ) {
              boxes[parentBoxId].c[boxes[parentBoxId].c.indexOf(boxId)] =
                idCounter
              break
            }
          }

          // update selected id
          if (selectedBoxId === boxId) {
            selectedBoxId = idCounter
          }
        }

        idCounter = idCounter + 1
      }
    }

    // Update boxes in state
    window.location.hash = jsurl.stringify(boxes)
    this.setState({
      selectedBoxId,
    })
  }

  handleResetBox(id) {
    const { boxes } = this.state
    window.location.hash = jsurl.stringify(
      this.sanitiseBoxes(
        update(boxes, {
          [id]: {
            d: { $set: 'row' },
            w: { $set: 'nowrap' },
            g: { $set: '0' },
            s: { $set: '1' },
            b: { $set: 'auto' },
            ac: { $set: 'stretch' },
            ai: { $set: 'stretch' },
            as: { $set: 'auto' },
            jc: { $set: 'flex-start' },
          },
        }),
      ),
    )
  }

  urlToBoxes() {
    if (window.location.hash) {
      let parsedBoxes
      try {
        // check if parse-able otherwise reset
        parsedBoxes = jsurl.parse(window.location.hash.slice(1))
      } catch (error) {
        console.log(error)
        parsedBoxes = false
      }

      if (parsedBoxes) {
        // successful parse
        this.setState({
          boxes: this.sanitiseBoxes(parsedBoxes),
        })
      } else {
        // unsuccessful parse
        console.log('unsuccessful parse')
        // set to default
        const { boxes } = this.state
        window.location.hash = jsurl.stringify(boxes)
      }
    } else {
      // set to default
      const { boxes } = this.state
      window.location.hash = jsurl.stringify(boxes)
    }
  }

  handleRemoveScreenWarning() {
    this.setState({
      screenWarningHidden: true,
    })
  }

  render() {
    const browserWarning = {
      __html: `<!--[if lte IE 10]>
        <div class="App__browserWarning App__fullPageWarning">
          <div>
            <h1><i class="fa fa-warning fa-3x"></i></h1>
            <h1>Flexible Boxes</h1>
            <p>Unfortunately your browser is not supported. Please upgrade. Alternatively you could try either <a class="button button--link" href="https://www.mozilla.org/firefox/"/>Firefox</a> or <a class="button button--link" href="https://www.google.com/chrome/">Chrome</a> browsers.</p>
          </div>
        </div>
      <![endif]-->`,
    }

    const { screenWarningHidden, boxes, selectedBoxId } = this.state

    return (
      <div className="App">
        <div dangerouslySetInnerHTML={browserWarning} />

        <div
          className={cc([
            'App__screenTooSmall App__fullPageWarning',
            {
              'App__screenTooSmall--isHidden': screenWarningHidden,
            },
          ])}
        >
          <div>
            <h1>
              <i className="fa fa-warning fa-3x" />
            </h1>
            <h1>Flexible Boxes</h1>
            <p>
              This is a tool to help with creating Flexbox based website
              layouts. Due to all the toolbars and output boxes, it really does{' '}
              <strong>NOT</strong> work well with small screen sizes.
            </p>
            <p>
              Try maximising your browser or, if you are using a tablet, try
              turning it to landscape.
            </p>
            <p>
              If you would like to proceed anyway, please click{' '}
              <button onClick={this.handleRemoveScreenWarning} type="button">
                here
              </button>{' '}
              (you have been warned).
            </p>
          </div>
        </div>

        <SplitPane
          defaultSize={275}
          minSize={275}
          primary="second"
          split="vertical"
        >
          <SplitPane
            defaultSize="50%"
            maxSize={-300}
            minSize={300}
            split="horizontal"
          >
            <SplitPane defaultSize={250} minSize={250} split="vertical">
              <Dom
                boxes={boxes}
                onAddBoxTo={this.handleAddBoxTo}
                onDeleteBox={this.handleDeleteBox}
                onMoveBox={this.handleReorderBox}
                onSelectBox={this.handleSelectBox}
                onUpdateBox={this.handleUpdateBox}
                selectedBoxId={selectedBoxId}
              />

              <FBox
                boxes={boxes}
                id="1"
                onSelectBox={this.handleSelectBox}
                selectedBoxId={selectedBoxId}
              />
            </SplitPane>

            <SplitPane
              defaultSize={150}
              maxSize={150}
              minSize={150}
              split="vertical"
            >
              <Sitebar onSelectBox={this.handleSelectBox} />

              <SplitPane
                defaultSize="50%"
                maxSize={-300}
                minSize={300}
                split="vertical"
              >
                <Html boxes={boxes} />

                <Css boxes={boxes} />
              </SplitPane>
            </SplitPane>
          </SplitPane>

          <Toolbar
            id={selectedBoxId}
            onNudge={this.handleNudge}
            onResetBox={this.handleResetBox}
            onUpdateBox={this.handleUpdateBox}
            selectedBox={boxes[selectedBoxId]}
          />
        </SplitPane>
      </div>
    )
  }
}

export default App
