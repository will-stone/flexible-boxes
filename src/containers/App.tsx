import cc from 'classcat'
import React, { Component } from 'react'
import SplitPane from 'react-split-pane'
import { addBoxTo } from '../boxUtils/addBoxTo'
import { deleteBox } from '../boxUtils/deleteBox'
import { resetBox } from '../boxUtils/resetBox'
import { updateBox } from '../boxUtils/updateBox'
import Css from '../components/Css'
import Dom from '../components/Dom'
import FBox from '../components/FBox'
import Html from '../components/Html'
import Sitebar from '../components/Sitebar'
import Toolbar from '../components/Toolbar'
import { IBox } from '../model'
import './../css/App.css'
import './../css/button.css'
import './../css/Pane.css'

export type TSelectedBoxId = number | undefined

interface IState {
  screenWarningHidden: boolean
  selectedBoxId: TSelectedBoxId
  boxes: [IBox]
}

class App extends Component {
  state: IState = {
    screenWarningHidden: false,
    selectedBoxId: undefined,
    boxes: [
      {
        c: [{}, {}, {}]
      }
    ]
  }

  // sanitiseBoxes = (boxes: IBox[]) =>
  //   produce(boxes, draftBoxes => {
  //     draftBoxes.forEach(box => {
  //       // Children
  //       if (!box.c || !box.c.length) delete box.c

  //       // Text
  //       if (!box.t || box.t === '') delete box.t
  //       // spaces to underscores
  //       else box.t = box.t.replace(' ', '_')

  //       // Flex Direction
  //       if (!box.d || box.d === 'row') delete box.d

  //       // Flex Wrap
  //       if (!box.w || box.w === 'nowrap') delete box.w

  //       // Flex Grow
  //       if (!box.g || box.g !== 0) delete box.g

  //       // Flex Shrink
  //       if ((!box.s && box.s !== 0) || box.s !== 1) delete box.s

  //       // Flex Basis
  //       if (!box.b || box.b === 'auto') delete box.b

  //       // Justify Content
  //       if (!box.jc || box.jc === 'flex-start') delete box.jc

  //       // Align Content
  //       if (!box.ac || box.ac === 'stretch') delete box.ac

  //       // Align Items
  //       if (!box.ai || box.ai === 'stretch') delete box.ai

  //       // Align Self
  //       if (!box.as || box.as === 'auto') delete box.as

  //       return box
  //     })
  //   })

  handleSelectBox = (path: number[]) => {
    this.setState({ selectedBoxId: path })
  }

  handleUpdateBox = (path: number[], key: keyof IBox, value: any) =>
    this.setState((state: IState) => ({ boxes: updateBox(state.boxes, path, key, value) }))

  handleAddBoxTo = (path: number[]) =>
    this.setState((state: IState) => ({ boxes: addBoxTo(state.boxes, path) }))

  handleDeleteBox = (path: number[]) =>
    this.setState((state: IState) => ({ boxes: deleteBox(state.boxes, path) }))

  handleReorderBox = (direction: any) => {
    var boxes = this.state.boxes as any
    var selectedBoxId = this.state.selectedBoxId

    var findParentOf = (id: any) => {
      for (var boxId in boxes) {
        if (boxes.hasOwnProperty(boxId)) {
          var box = boxes[boxId]
          if (box.c && box.c.indexOf(parseInt(id, 10)) > -1) {
            return boxId
          }
        }
      }
    }

    var parentId = findParentOf(selectedBoxId) as any
    var parentIdOfParent = findParentOf(parentId) as any
    if (parentIdOfParent) {
      var indexOfParentInParent = boxes[parentIdOfParent].c.indexOf(parseInt(parentId, 10))
    }
    var indexOfSelected = boxes[parentId].c.indexOf(selectedBoxId)

    // Remove selected from children array
    var removeSelected = () => {
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
        ;[boxes[parentId].c[indexOfSelected], boxes[parentId].c[indexOfSelected - 1]] = [
          boxes[parentId].c[indexOfSelected - 1],
          boxes[parentId].c[indexOfSelected]
        ]
      }
    } else if (direction === 'up' && indexOfSelected === 0) {
      // Direction up and currently at beginning of children array, move to parent
      removeSelected()
      boxes[parentIdOfParent].c.splice(indexOfParentInParent, 0, selectedBoxId)
    } else if (direction === 'down' && indexOfSelected !== boxes[parentId].c.length - 1) {
      // Direction down and NOT currently at end of children array
      // if box below has children, move selected box into beginning of that array
      if (boxes[boxes[parentId].c[indexOfSelected + 1]].c) {
        removeSelected()
        boxes[boxes[parentId].c[indexOfSelected]].c.unshift(selectedBoxId)
        // else swap selected with box below it in array
      } else {
        ;[boxes[parentId].c[indexOfSelected], boxes[parentId].c[indexOfSelected + 1]] = [
          boxes[parentId].c[indexOfSelected + 1],
          boxes[parentId].c[indexOfSelected]
        ]
      }
    } else if (direction === 'down' && indexOfSelected === boxes[parentId].c.length - 1) {
      // Direction down and currently at end of children array, move to parent
      removeSelected()
      boxes[parentIdOfParent].c.splice(indexOfParentInParent + 1, 0, selectedBoxId)
    }

  //   window.location.hash = jsurl.stringify(boxes)
  // }

  handleResetBox = (path: number[]) =>
    this.setState((state: IState) => ({ boxes: resetBox(state.boxes, path) }))

  // urlToBoxes = () => {
  //   if (window.location.hash) {
  //     var parsedBoxes
  //     try {
  //       // check if parse-able otherwise reset
  //       parsedBoxes = jsurl.parse(window.location.hash.substring(1))
  //     } catch (err) {
  //       console.log(err)
  //       parsedBoxes = false
  //     }

  //     if (parsedBoxes) {
  //       // successful parse
  //       parsedBoxes = this.sanitiseBoxes(parsedBoxes)
  //       this.setState({
  //         boxes: parsedBoxes
  //       })
  //     } else {
  //       // unsuccessful parse
  //       // set to default
  //       window.location.hash = jsurl.stringify(this.state.boxes)
  //     }
  //   } else {
  //     // set to default
  //     window.location.hash = jsurl.stringify(this.state.boxes)
  //   }
  // }

  removeScreenWarning = () =>
    this.setState({
      screenWarningHidden: true
    })

  // componentWillMount = () => {
  //   this.urlToBoxes()
  //   window.addEventListener(
  //     'hashchange',
  //     () => {
  //       this.urlToBoxes()
  //     },
  //     false
  //   )
  // }

  // componentDidUpdate = () => {
  //   window.location.hash = jsurl.stringify(this.state.boxes)
  // }

  render() {
    var browserWarning = {
      __html: `<!--[if lte IE 10]>
        <div class="App__browserWarning App__fullPageWarning">
          <div>
            <h1><i class="fa fa-warning fa-3x"></i></h1>
            <h1>Flexible Boxes</h1>
            <p>Unfortunately your browser is not supported. Please upgrade. Alternatively you could try either <a class="button button--link" href="https://www.mozilla.org/firefox/"/>Firefox</a> or <a class="button button--link" href="https://www.google.com/chrome/">Chrome</a> browsers.</p>
          </div>
        </div>
      <![endif]-->`
    }

    return (
      <div className="App">
        <div dangerouslySetInnerHTML={browserWarning} />

        <div
          className={cc([
            'App__screenTooSmall App__fullPageWarning',
            {
              'App__screenTooSmall--isHidden': this.state.screenWarningHidden
            }
          ])}
        >
          <div>
            <h1>
              <i className="fa fa-warning fa-3x" />
            </h1>
            <h1>Flexible Boxes</h1>
            <p>
              This is a tool to help with creating Flexbox based website layouts. Due to all the
              toolbars and output boxes, it really does <strong>NOT</strong> work well with small
              screen sizes.
            </p>
            <p>
              Try maximising your browser or, if you are using a tablet, try turning it to
              landscape.
            </p>
            <p>
              If you would like to proceed anyway, please click{' '}
              <button onClick={this.removeScreenWarning.bind(this)}>here</button> (you have been
              warned).
            </p>
          </div>
        </div>

        <SplitPane split="vertical" defaultSize={275} minSize={275} primary="second">
          <SplitPane split="horizontal" defaultSize="50%" minSize={300} maxSize={-300}>
            <SplitPane split="vertical" defaultSize={250} minSize={250}>
              <Dom
                boxes={this.state.boxes}
                handleSelectBox={this.handleSelectBox}
                selectedBoxId={this.state.selectedBoxId}
                handleAddBoxTo={this.handleAddBoxTo}
                handleDeleteBox={this.handleDeleteBox}
                updateBox={this.handleUpdateBox}
                moveBox={this.handleReorderBox}
              />

              <FBox
                boxes={this.state.boxes}
                id={1}
                selectBox={this.handleSelectBox}
                selectedBoxId={this.state.selectedBoxId}
              />
            </SplitPane>

            <SplitPane split="vertical" defaultSize={150} minSize={150} maxSize={150}>
              <Sitebar handleSelectBox={this.handleSelectBox} />

              <SplitPane split="vertical" defaultSize="50%" minSize={300} maxSize={-300}>
                <Html boxes={this.state.boxes} />

                <Css boxes={this.state.boxes} />
              </SplitPane>
            </SplitPane>
          </SplitPane>

          <Toolbar
            selectedBoxId={this.state.selectedBoxId}
            boxes={this.state.boxes}
            updateBox={this.handleUpdateBox}
            nudge={this.handleNudge}
            resetBox={this.handleResetBox}
          />
        </SplitPane>
      </div>
    )
  }
}

export default App
