import cc from 'classcat'
import React, { Component } from 'react'
import { IBox } from '../model'
import { selectBox } from '../utils/box.select'
import './../css/Toolbar.css'
import { TSelectedBoxPath } from './App'
import { ToolbarIconButton } from './Toolbar.iconButton'

class Toolbar extends Component<{
  selectedBoxPath: TSelectedBoxPath
  boxes: IBox[]
  onResetBox: (path: number[]) => void
  onUpdateBox: (path: number[], key: keyof IBox, value: any) => void
}> {
  public render() {
    const selectedBoxPath = this.props.selectedBoxPath
    const box = selectedBoxPath && selectBox(this.props.boxes, selectedBoxPath)

    return (
      <div
        className={cc([
          'Toolbar Pane__component',
          { 'Toolbar--isOpen': box },
          {
            'Toolbar--isColumn': box && box.d && box.d === 'column',
          },
        ])}
      >
        <h2 className="Pane__title">
          TOOLBAR
          {box && (
            <button
              className="Pane__titleButton button"
              onClick={() => selectedBoxPath && this.props.onResetBox(selectedBoxPath)}
            >
              DEFAULT
            </button>
          )}
        </h2>
        <div className="Toolbar__scroller">
          {box && selectedBoxPath && (
            <div className="Toolbar__tools">
              <h2
                className={cc([
                  'Toolbar__groupTitle',
                  {
                    Toolbar__disabled: !box.c,
                  },
                ])}
              >
                Affects child boxes
              </h2>
              <div className="Toolbar__section">
                <h3 className={cc({ Toolbar__disabled: !box.c })}>Flow</h3>
                <div className="Toolbar__splitSection">
                  <div>
                    <h4 className={cc({ Toolbar__disabled: !box.c })}>Direction</h4>
                    <ToolbarIconButton
                      label="Row"
                      onClick={() => this.props.onUpdateBox(selectedBoxPath, 'd', 'row')}
                      isDefault
                      itemCount={3}
                      isActive={!box.d}
                      isDisabled={!box.c}
                      iconClass="fbi-row"
                    />
                    <ToolbarIconButton
                      label="Column"
                      onClick={() => this.props.onUpdateBox(selectedBoxPath, 'd', 'column')}
                      itemCount={3}
                      isActive={box.d === 'column'}
                      isDisabled={!box.c}
                      iconClass="fbi-column"
                    />
                  </div>
                  <div>
                    <h4 className={cc({ Toolbar__disabled: !box.c })}>Wrap</h4>
                    <ToolbarIconButton
                      label="Nowrap"
                      onClick={() => this.props.onUpdateBox(selectedBoxPath, 'w', 'nowrap')}
                      isDefault
                      itemCount={6}
                      isActive={!box.w}
                      isDisabled={!box.c}
                      iconClass="fbi-nowrap"
                    />
                    <ToolbarIconButton
                      label="Wrap"
                      onClick={() => this.props.onUpdateBox(selectedBoxPath, 'w', 'wrap')}
                      itemCount={6}
                      isActive={box.w === 'wrap'}
                      isDisabled={!box.c}
                      iconClass="fbi-wrap"
                    />
                  </div>
                </div>
              </div>
              <div className="Toolbar__section">
                <h3 className={cc({ Toolbar__disabled: !box.c })}>Justify Content</h3>
                <ToolbarIconButton
                  label="Start"
                  onClick={() => this.props.onUpdateBox(selectedBoxPath, 'jc', 'flex-start')}
                  isDefault
                  itemCount={2}
                  isActive={!box.jc}
                  isDisabled={!box.c}
                  iconClass="fbi-jc fbi-jc-flex-start"
                />
                <ToolbarIconButton
                  label="End"
                  onClick={() => this.props.onUpdateBox(selectedBoxPath, 'jc', 'flex-end')}
                  itemCount={2}
                  isActive={box.jc === 'flex-end'}
                  isDisabled={!box.c}
                  iconClass="fbi-jc fbi-jc-flex-end"
                />
                <ToolbarIconButton
                  label="Center"
                  onClick={() => this.props.onUpdateBox(selectedBoxPath, 'jc', 'center')}
                  itemCount={2}
                  isActive={box.jc === 'center'}
                  isDisabled={!box.c}
                  iconClass="fbi-jc fbi-jc-center"
                />
                <ToolbarIconButton
                  label="Between"
                  onClick={() => this.props.onUpdateBox(selectedBoxPath, 'jc', 'space-between')}
                  itemCount={2}
                  isActive={box.jc === 'space-between'}
                  isDisabled={!box.c}
                  iconClass="fbi-jc fbi-jc-space-between"
                />
                <ToolbarIconButton
                  label="Around"
                  onClick={() => this.props.onUpdateBox(selectedBoxPath, 'jc', 'space-around')}
                  itemCount={2}
                  isActive={box.jc === 'space-around'}
                  isDisabled={!box.c}
                  iconClass="fbi-jc fbi-jc-space-around"
                />
              </div>
              <div className="Toolbar__section">
                <h3 className={cc({ Toolbar__disabled: !box.c })}>Align Items</h3>
                <ToolbarIconButton
                  label="Start"
                  onClick={() => this.props.onUpdateBox(selectedBoxPath, 'ai', 'flex-start')}
                  itemCount={2}
                  isActive={box.ai === 'flex-start'}
                  isDisabled={!box.c}
                  iconClass="fbi-ai fbi-ai-flex-start"
                />
                <ToolbarIconButton
                  label="End"
                  onClick={() => this.props.onUpdateBox(selectedBoxPath, 'ai', 'flex-end')}
                  itemCount={2}
                  isActive={box.ai === 'flex-end'}
                  isDisabled={!box.c}
                  iconClass="fbi-ai fbi-ai-flex-end"
                />
                <ToolbarIconButton
                  label="Center"
                  onClick={() => this.props.onUpdateBox(selectedBoxPath, 'ai', 'center')}
                  itemCount={2}
                  isActive={box.ai === 'center'}
                  isDisabled={!box.c}
                  iconClass="fbi-ai fbi-ai-center"
                />
                <ToolbarIconButton
                  label="Stretch"
                  onClick={() => this.props.onUpdateBox(selectedBoxPath, 'ai', 'stretch')}
                  itemCount={2}
                  isActive={!box.ai}
                  isDisabled={!box.c}
                  isDefault
                  iconClass="fbi-ai fbi-ai-stretch"
                />
                <ToolbarIconButton
                  label="Stretch"
                  onClick={() => this.props.onUpdateBox(selectedBoxPath, 'ai', 'baseline')}
                  itemCount={2}
                  item="B"
                  isActive={box.ai === 'baseline'}
                  isDisabled={!box.c}
                  iconClass="fbi-ai fbi-ai-baseline"
                />
              </div>
              <h2 className="Toolbar__groupTitle">Affects this box</h2>
              <div className="Toolbar__section">
                <h3>flex</h3>
                <div className="Toolbar__splitSection">
                  <div className={cc({ Toolbar__default: !box.g })}>
                    <h4>GROW</h4>
                    <div>
                      <button
                        className="Toolbar__nudgeButton"
                        onClick={() =>
                          this.props.onUpdateBox(selectedBoxPath, 'g', box.g ? box.g - 1 : 0)
                        }
                      >
                        <i className="fa fa-minus" />
                      </button>
                      <span className="Toolbar__nudgeText">{box.g ? box.g : 0}</span>
                      <button
                        className="Toolbar__nudgeButton"
                        onClick={() =>
                          this.props.onUpdateBox(selectedBoxPath, 'g', box.g ? box.g + 1 : 1)
                        }
                      >
                        <i className="fa fa-plus" />
                      </button>
                    </div>
                  </div>
                  <div
                    className={cc({
                      Toolbar__default: box.s !== 0 && !box.s,
                    })}
                  >
                    <h4>SHRINK</h4>
                    <div>
                      <button
                        className="Toolbar__nudgeButton"
                        onClick={() =>
                          this.props.onUpdateBox(selectedBoxPath, 's', box.s ? box.s - 1 : 0)
                        }
                      >
                        <i className="fa fa-minus" />
                      </button>
                      <span className="Toolbar__nudgeText">{box.s || box.s === 0 ? box.s : 1}</span>
                      <button
                        className="Toolbar__nudgeButton"
                        onClick={() =>
                          this.props.onUpdateBox(
                            selectedBoxPath,
                            's',
                            box.s || box.s === 0 ? box.s + 1 : 2,
                          )
                        }
                      >
                        <i className="fa fa-plus" />
                      </button>
                    </div>
                  </div>
                  <div className={cc({ Toolbar__default: !box.b })}>
                    <h4>BASIS</h4>
                    <input
                      className="Toolbar__basisInput"
                      type="text"
                      name="b"
                      placeholder="auto"
                      value={box.b ? box.b : ''}
                      onChange={e =>
                        this.props.onUpdateBox(selectedBoxPath, 'b', e.currentTarget.value)
                      }
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>
              <div className="Toolbar__section">
                <h3>Align Self</h3>
                <ToolbarIconButton
                  label="Start"
                  onClick={() => this.props.onUpdateBox(selectedBoxPath, 'as', 'flex-start')}
                  itemCount={1}
                  isActive={box.as === 'flex-start'}
                  isDisabled={!box.c}
                  iconClass="fbi-as fbi-as-flex-start"
                />
                <ToolbarIconButton
                  label="End"
                  onClick={() => this.props.onUpdateBox(selectedBoxPath, 'as', 'flex-end')}
                  itemCount={1}
                  isActive={box.as === 'flex-end'}
                  isDisabled={!box.c}
                  iconClass="fbi-as fbi-as-flex-end"
                />
                <ToolbarIconButton
                  label="Center"
                  onClick={() => this.props.onUpdateBox(selectedBoxPath, 'as', 'center')}
                  itemCount={1}
                  isActive={box.as === 'center'}
                  isDisabled={!box.c}
                  iconClass="fbi-as fbi-as-center"
                />
                <ToolbarIconButton
                  label="Stretch"
                  onClick={() => this.props.onUpdateBox(selectedBoxPath, 'as', 'stretch')}
                  itemCount={1}
                  isActive={box.as === 'stretch'}
                  isDisabled={!box.c}
                  iconClass="fbi-as fbi-as-stretch"
                />
                <ToolbarIconButton
                  label="Auto"
                  onClick={() => this.props.onUpdateBox(selectedBoxPath, 'as', 'auto')}
                  itemCount={1}
                  item="A"
                  isActive={!box.as}
                  isDisabled={!box.c}
                  isDefault
                  iconClass="fbi-as fbi-as-auto"
                />
              </div>
            </div>
          )}
          <div className="Toolbar__intro">
            <div className="Toolbar__introInner">Select a box</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Toolbar

/**
 * This is the form control for Align Content. Not currently included as not sure how useful it is in this app.
 */
// <div className="Toolbar__section">
//   <div className="Toolbar__sectionTitle">align-content</div>
//   <label>
//     <input
//       type="radio"
//       name="ac"
//       value="stretch"
//       checked={!thisBox.ac || thisBox.ac === 'stretch'}
//       onChange={e => this.props.updateBox(e, this.props.id)} /> stretch
//               </label>
//   <label>
//     <input
//       type="radio"
//       name="ac"
//       value="center"
//       checked={thisBox.ac === 'center'}
//       onChange={e => this.props.updateBox(e, this.props.id)} /> center
//               </label>
//   <label>
//     <input
//       type="radio"
//       name="ac"
//       value="flex-start"
//       checked={thisBox.ac === 'flex-start'}
//       onChange={e => this.props.updateBox(e, this.props.id)} /> flex-start
//               </label>
//   <label>
//     <input
//       type="radio"
//       name="ac"
//       value="flex-end"
//       checked={thisBox.ac === 'flex-end'}
//       onChange={e => this.props.updateBox(e, this.props.id)} /> flex-end
//               </label>
//   <label>
//     <input
//       type="radio"
//       name="ac"
//       value="space-between"
//       checked={thisBox.ac === 'space-between'}
//       onChange={e => this.props.updateBox(e, this.props.id)} /> space-between
//               </label>
//   <label>
//     <input
//       type="radio"
//       name="ac"
//       value="space-around"
//       checked={thisBox.ac === 'space-around'}
//       onChange={e => this.props.updateBox(e, this.props.id)} /> space-around
//               </label>
// </div>
