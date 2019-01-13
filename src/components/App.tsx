import cc from 'classcat'
import React, { Component } from 'react'
import SplitPane from 'react-split-pane'
import '../css/App.css'
import '../css/button.css'
import '../css/Pane.css'
import { IBox } from '../model'
import { addBoxTo } from '../utils/box.addTo'
import { deleteBox } from '../utils/box.delete'
import { moveBox } from '../utils/box.move'
import { resetBox } from '../utils/box.reset'
import { updateBox } from '../utils/box.update'
import Dom from './Dom'
import { boxesToString } from '../utils/boxes.toString'
import { boxesFromString } from '../utils/boxes.fromString'
import { cleanupBoxes } from '../utils/boxes.cleanup'

export type TSelectedBoxPath = number[] | undefined

interface IState {
  screenWarningHidden: boolean
  selectedBoxPath: TSelectedBoxPath
  boxes: IBox[]
  showEditTitle: boolean
}

class App extends Component<{}, IState> {
  state: IState = {
    screenWarningHidden: false,
    selectedBoxPath: undefined,
    boxes: [
      {
        c: [{}, {}, {}]
      }
    ],
    showEditTitle: false
  }

  handleSelectBox = (path: TSelectedBoxPath) => {
    this.setState(state => ({
      selectedBoxPath: path,
      showEditTitle: !path ? false : state.showEditTitle
    }))
  }

  handleUpdateBox = (path: number[], key: keyof IBox, value: any) =>
    this.setState((state: IState) => ({ boxes: updateBox(state.boxes, path, key, value) }))

  handleAddBoxTo = (path: number[]) =>
    this.setState((state: IState) => ({ boxes: addBoxTo(state.boxes, path) }))

  handleDeleteBox = (path: number[]) =>
    this.setState((state: IState) => ({ boxes: deleteBox(state.boxes, path) }))

  handleMoveBox = (direction: 'up' | 'down') => {
    this.setState((state: IState) => {
      if (state.selectedBoxPath) {
        const [newBoxes, newPath] = moveBox(state.boxes, state.selectedBoxPath, direction)
        return {
          boxes: newBoxes,
          selectedBoxPath: newPath
        }
      }
      return state
    })
  }

  handleResetBox = (path: number[]) =>
    this.setState((state: IState) => ({ boxes: resetBox(state.boxes, path) }))

  handleToggleEditTitle = () => this.setState(state => ({ showEditTitle: !state.showEditTitle }))

  setBoxes = (boxes: IBox[]) => {
    const cleanedBoxes = cleanupBoxes(boxes)
    this.setState({ boxes: cleanedBoxes })
  }

  urlToBoxes = () => {
    if (window.location.hash) {
      try {
        // check if parse-able otherwise reset
        const parsed = boxesFromString(window.location.hash.substring(1))
        cleanupBoxes(parsed)
        this.setState({
          boxes: parsed
        })
      } catch (err) {
        console.log(err)
        window.location.hash = boxesToString(this.state.boxes)
      }
    } else {
      // set to default
      window.location.hash = boxesToString(this.state.boxes)
    }
  }

  removeScreenWarning = () =>
    this.setState({
      screenWarningHidden: true
    })

  componentWillMount = () => {
    this.urlToBoxes()
  }

  componentDidUpdate = () => {
    window.location.hash = boxesToString(this.state.boxes)
  }

  render() {
    var browserWarning = {
      __html: `<!--[if lte IE 10]>
        <div class="App__browserWarning App__fullPageWarning">
          <div>
            <h1><i class="fa fa-warning fa-3x"></i></h1>
            <h1>Flexible Boxes</h1>
            <p>
              Unfortunately your browser is not supported. Please upgrade. Alternatively you could
              try either
              <a class="button button--link" href="https://www.mozilla.org/firefox/"/>Firefox</a>
              or
              <a class="button button--link" href="https://www.google.com/chrome/">Chrome</a>
              browsers.
            </p>
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
                selectedBoxPath={this.state.selectedBoxPath}
                onSelectBox={this.handleSelectBox}
                onAddBoxTo={this.handleAddBoxTo}
                onDeleteBox={this.handleDeleteBox}
                onMoveBox={this.handleMoveBox}
                onUpdateBox={this.handleUpdateBox}
                onToggleEditTitle={this.handleToggleEditTitle}
                showEditTitle={this.state.showEditTitle}
              />

              <div />

              {/* <FBox
                boxes={this.state.boxes}
                onSelectBox={this.handleSelectBox}
                selectedBoxPath={this.state.selectedBoxPath}
              /> */}
            </SplitPane>

            <SplitPane split="vertical" defaultSize={150} minSize={150} maxSize={150}>
              {/* <Sitebar handleSelectBox={this.handleSelectBox} /> */}
              <div />

              <SplitPane split="vertical" defaultSize="50%" minSize={300} maxSize={-300}>
                {/* <Html boxes={this.state.boxes} /> */}
                <div />

                {/* <Css boxes={this.state.boxes} /> */}
                <div />
              </SplitPane>
            </SplitPane>
          </SplitPane>

          {/* <Toolbar
            selectedBoxId={this.state.selectedBoxId}
            boxes={this.state.boxes}
            updateBox={this.handleUpdateBox}
            nudge={this.handleNudge}
            resetBox={this.handleResetBox}
          /> */}
          <div />
        </SplitPane>
      </div>
    )
  }
}

export default App
