import cc from 'classcat'
import React, { Component } from 'react'
import SplitPane from 'react-split-pane'
import '../css/App.css'
import '../css/Pane.css'
import '../css/button.css'
import { defaultBoxes, IBox } from '../model'
import { addBoxTo } from '../utils/box.addTo'
import { deleteBox } from '../utils/box.delete'
import { moveBox } from '../utils/box.move'
import { resetBox } from '../utils/box.reset'
import { updateBox } from '../utils/box.update'
import { cleanupBoxes } from '../utils/boxes.cleanup'
import { boxesFromString } from '../utils/boxes.fromString'
import { boxesToString } from '../utils/boxes.toString'
import Dom from './Dom'
import FBox from './FBox'
import Toolbar from './Toolbar'

export type TSelectedBoxPath = number[] | undefined

interface IState {
  screenWarningHidden: boolean
  selectedBoxPath: TSelectedBoxPath
  boxes: IBox[]
  showEditTitle: boolean
}

class App extends Component<{}, IState> {
  public state: IState = {
    screenWarningHidden: false,
    selectedBoxPath: undefined,
    boxes: defaultBoxes,
    showEditTitle: false,
  }

  public handleClearBoxes = () => this.setState({ boxes: [{}], selectedBoxPath: undefined })

  public handleSelectBox = (path: TSelectedBoxPath) => {
    this.setState(state => ({
      selectedBoxPath: path,
      showEditTitle: !path ? false : state.showEditTitle,
    }))
  }

  public handleUpdateBox = (path: number[], key: keyof IBox, value: any) =>
    this.setState((state: IState) => ({
      boxes: cleanupBoxes(updateBox(state.boxes, path, key, value)),
    }))

  public handleAddBoxTo = (path: number[]) =>
    this.setState((state: IState) => ({ boxes: addBoxTo(state.boxes, path) }))

  public handleDeleteBox = (path: number[]) =>
    this.setState((state: IState) => ({ boxes: deleteBox(state.boxes, path) }))

  public handleMoveBox = (direction: 'up' | 'down') => {
    this.setState((state: IState) => {
      if (state.selectedBoxPath) {
        const [newBoxes, newPath] = moveBox(state.boxes, state.selectedBoxPath, direction)
        return {
          boxes: newBoxes,
          selectedBoxPath: newPath,
        }
      }
      return state
    })
  }

  public handleResetBox = (path: number[]) =>
    this.setState((state: IState) => ({ boxes: resetBox(state.boxes, path) }))

  public handleToggleEditTitle = () =>
    this.setState(state => ({ showEditTitle: !state.showEditTitle }))

  public urlToBoxes = () => {
    // check if hash otherwise reset
    if (window.location.hash) {
      // check if parse-able otherwise reset
      try {
        const parsed = boxesFromString(window.location.hash.substring(1))
        this.setState({ boxes: cleanupBoxes(parsed) })
      } catch (err) {
        this.setState({ boxes: defaultBoxes })
      }
    } else {
      this.setState({ boxes: defaultBoxes })
    }
  }

  public removeScreenWarning = () =>
    this.setState({
      screenWarningHidden: true,
    })

  public componentWillMount = () => {
    this.urlToBoxes()
  }

  public componentDidUpdate = () => {
    window.location.hash = boxesToString(this.state.boxes)
  }

  public render() {
    const browserWarning = {
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
      <![endif]-->`,
    }

    return (
      <div className="App">
        <div dangerouslySetInnerHTML={browserWarning} />

        <div
          className={cc([
            'App__screenTooSmall App__fullPageWarning',
            {
              'App__screenTooSmall--isHidden': this.state.screenWarningHidden,
            },
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
                onClearBoxes={this.handleClearBoxes}
                showEditTitle={this.state.showEditTitle}
              />

              <FBox
                box={this.state.boxes[0]}
                path={[0]}
                selectedBoxPath={this.state.selectedBoxPath}
                onSelectBox={this.handleSelectBox}
              />
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

          <Toolbar
            selectedBoxPath={this.state.selectedBoxPath}
            boxes={this.state.boxes}
            onUpdateBox={this.handleUpdateBox}
            onResetBox={this.handleResetBox}
          />
        </SplitPane>
      </div>
    )
  }
}

export default App
