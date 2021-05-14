/* eslint-disable camelcase */
import './../css/Toolbar.css'

import cc from 'classcat'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { resetBox, updateBoxProperty } from '../store/actions'

const Toolbar = ({ id }) => {
  const dispatch = useDispatch()
  const boxes = useSelector((state) => state.ui.boxes)
  const selectedBoxId = useSelector((state) => state.ui.selectedBoxId)
  const selectedBox = boxes[selectedBoxId]

  return (
    <div
      className={cc([
        'Toolbar Pane__component',
        { 'Toolbar--isOpen': selectedBox },
        {
          'Toolbar--isColumn':
            selectedBox && selectedBox.d && selectedBox.d === 'column',
        },
      ])}
    >
      <h2 className="Pane__title">
        TOOLBAR
        {selectedBox && (
          <button
            className="Pane__titleButton button"
            onClick={() => dispatch(resetBox(id))}
            type="button"
          >
            DEFAULT
          </button>
        )}
      </h2>
      <div className="Toolbar__scroller">
        {
          /* Only show toolbar if box is selected */
          selectedBox ? (
            <div className="Toolbar__tools">
              <h2
                className={cc([
                  'Toolbar__groupTitle',
                  {
                    Toolbar__disabled: !selectedBox.c,
                  },
                ])}
              >
                Affects child boxes
              </h2>

              <div className="Toolbar__section">
                <h3 className={cc({ Toolbar__disabled: !selectedBox.c })}>
                  Flow
                </h3>
                <div className="Toolbar__splitSection">
                  <div>
                    <h4 className={cc({ Toolbar__disabled: !selectedBox.c })}>
                      Direction
                    </h4>
                    <label className="Toolbar__iconRadioLabel">
                      <input
                        checked={!selectedBox.d || selectedBox.d === 'row'}
                        disabled={!selectedBox.c}
                        name="d"
                        onChange={(event_) =>
                          dispatch(
                            updateBoxProperty(
                              id,
                              event_.target.name,
                              event_.target.value,
                            ),
                          )
                        }
                        type="radio"
                        value="row"
                      />
                      <i className="fbi fbi-row">
                        <i className="fbi-items">
                          <i />
                          <i />
                          <i />
                        </i>
                        <span className="Toolbar__default">Row</span>
                      </i>
                    </label>
                    <label className="Toolbar__iconRadioLabel">
                      <input
                        checked={selectedBox.d === 'column'}
                        disabled={!selectedBox.c}
                        name="d"
                        onChange={(event_) =>
                          dispatch(
                            updateBoxProperty(
                              id,
                              event_.target.name,
                              event_.target.value,
                            ),
                          )
                        }
                        type="radio"
                        value="column"
                      />
                      <i className="fbi fbi-column">
                        <i className="fbi-items">
                          <i />
                          <i />
                          <i />
                        </i>
                        <span>Column</span>
                      </i>
                    </label>
                  </div>

                  <div>
                    <h4 className={cc({ Toolbar__disabled: !selectedBox.c })}>
                      Wrap
                    </h4>
                    <label className="Toolbar__iconRadioLabel">
                      <input
                        checked={!selectedBox.w || selectedBox.w === 'nowrap'}
                        disabled={!selectedBox.c}
                        name="w"
                        onChange={(event_) =>
                          dispatch(
                            updateBoxProperty(
                              id,
                              event_.target.name,
                              event_.target.value,
                            ),
                          )
                        }
                        type="radio"
                        value="nowrap"
                      />
                      <i className="fbi fbi-nowrap">
                        <i className="fbi-items">
                          <i />
                          <i />
                          <i />
                          <i />
                          <i />
                          <i />
                        </i>
                        <span className="Toolbar__default">Nowrap</span>
                      </i>
                    </label>
                    <label className="Toolbar__iconRadioLabel">
                      <input
                        checked={selectedBox.w === 'wrap'}
                        disabled={!selectedBox.c}
                        name="w"
                        onChange={(event_) =>
                          dispatch(
                            updateBoxProperty(
                              id,
                              event_.target.name,
                              event_.target.value,
                            ),
                          )
                        }
                        type="radio"
                        value="wrap"
                      />
                      <i className="fbi fbi-wrap">
                        <i className="fbi-items">
                          <i />
                          <i />
                          <i />
                          <i />
                          <i />
                          <i />
                        </i>
                        <span>Wrap</span>
                      </i>
                    </label>
                  </div>
                </div>
              </div>

              <div className="Toolbar__section">
                <h3 className={cc({ Toolbar__disabled: !selectedBox.c })}>
                  Justify Content
                </h3>
                <label className="Toolbar__iconRadioLabel">
                  <input
                    checked={!selectedBox.jc || selectedBox.jc === 'flex-start'}
                    disabled={!selectedBox.c}
                    name="jc"
                    onChange={(event_) =>
                      dispatch(
                        updateBoxProperty(
                          id,
                          event_.target.name,
                          event_.target.value,
                        ),
                      )
                    }
                    type="radio"
                    value="flex-start"
                  />
                  <i className="fbi fbi-jc fbi-jc-flex-start">
                    <i className="fbi-items">
                      <i />
                      <i />
                    </i>
                    <span className="Toolbar__default">Start</span>
                  </i>
                </label>

                <label className="Toolbar__iconRadioLabel">
                  <input
                    checked={selectedBox.jc === 'flex-end'}
                    disabled={!selectedBox.c}
                    name="jc"
                    onChange={(event_) =>
                      dispatch(
                        updateBoxProperty(
                          id,
                          event_.target.name,
                          event_.target.value,
                        ),
                      )
                    }
                    type="radio"
                    value="flex-end"
                  />
                  <i className="fbi fbi-jc fbi-jc-flex-end">
                    <i className="fbi-items">
                      <i />
                      <i />
                    </i>
                    <span>End</span>
                  </i>
                </label>

                <label className="Toolbar__iconRadioLabel">
                  <input
                    checked={selectedBox.jc === 'center'}
                    disabled={!selectedBox.c}
                    name="jc"
                    onChange={(event_) =>
                      dispatch(
                        updateBoxProperty(
                          id,
                          event_.target.name,
                          event_.target.value,
                        ),
                      )
                    }
                    type="radio"
                    value="center"
                  />
                  <i className="fbi fbi-jc fbi-jc-center">
                    <i className="fbi-items">
                      <i />
                      <i />
                    </i>
                    <span>Center</span>
                  </i>
                </label>

                <label className="Toolbar__iconRadioLabel">
                  <input
                    checked={selectedBox.jc === 'space-between'}
                    disabled={!selectedBox.c}
                    name="jc"
                    onChange={(event_) =>
                      dispatch(
                        updateBoxProperty(
                          id,
                          event_.target.name,
                          event_.target.value,
                        ),
                      )
                    }
                    type="radio"
                    value="space-between"
                  />
                  <i className="fbi fbi-jc fbi-jc-space-between">
                    <i className="fbi-items">
                      <i />
                      <i />
                    </i>
                    <span>Between</span>
                  </i>
                </label>

                <label className="Toolbar__iconRadioLabel">
                  <input
                    checked={selectedBox.jc === 'space-around'}
                    disabled={!selectedBox.c}
                    name="jc"
                    onChange={(event_) =>
                      dispatch(
                        updateBoxProperty(
                          id,
                          event_.target.name,
                          event_.target.value,
                        ),
                      )
                    }
                    type="radio"
                    value="space-around"
                  />
                  <i className="fbi fbi-jc fbi-jc-space-around">
                    <i className="fbi-items">
                      <i />
                      <i />
                    </i>
                    <span>Around</span>
                  </i>
                </label>
              </div>

              <div className="Toolbar__section">
                <h3 className={cc({ Toolbar__disabled: !selectedBox.c })}>
                  Align Items
                </h3>

                <label className="Toolbar__iconRadioLabel">
                  <input
                    checked={selectedBox.ai === 'flex-start'}
                    disabled={!selectedBox.c}
                    name="ai"
                    onChange={(event_) =>
                      dispatch(
                        updateBoxProperty(
                          id,
                          event_.target.name,
                          event_.target.value,
                        ),
                      )
                    }
                    type="radio"
                    value="flex-start"
                  />
                  <i className="fbi fbi-ai fbi-ai-flex-start">
                    <i className="fbi-items">
                      <i />
                      <i />
                    </i>
                    <span>Start</span>
                  </i>
                </label>

                <label className="Toolbar__iconRadioLabel">
                  <input
                    checked={selectedBox.ai === 'flex-end'}
                    disabled={!selectedBox.c}
                    name="ai"
                    onChange={(event_) =>
                      dispatch(
                        updateBoxProperty(
                          id,
                          event_.target.name,
                          event_.target.value,
                        ),
                      )
                    }
                    type="radio"
                    value="flex-end"
                  />
                  <i className="fbi fbi-ai fbi-ai-flex-end">
                    <i className="fbi-items">
                      <i />
                      <i />
                    </i>
                    <span>End</span>
                  </i>
                </label>

                <label className="Toolbar__iconRadioLabel">
                  <input
                    checked={selectedBox.ai === 'center'}
                    disabled={!selectedBox.c}
                    name="ai"
                    onChange={(event_) =>
                      dispatch(
                        updateBoxProperty(
                          id,
                          event_.target.name,
                          event_.target.value,
                        ),
                      )
                    }
                    type="radio"
                    value="center"
                  />
                  <i className="fbi fbi-ai fbi-ai-center">
                    <i className="fbi-items">
                      <i />
                      <i />
                    </i>
                    <span>Center</span>
                  </i>
                </label>

                <label className="Toolbar__iconRadioLabel">
                  <input
                    checked={!selectedBox.ai || selectedBox.ai === 'stretch'}
                    disabled={!selectedBox.c}
                    name="ai"
                    onChange={(event_) =>
                      dispatch(
                        updateBoxProperty(
                          id,
                          event_.target.name,
                          event_.target.value,
                        ),
                      )
                    }
                    type="radio"
                    value="stretch"
                  />
                  <i className="fbi fbi-ai fbi-ai-stretch">
                    <i className="fbi-items">
                      <i />
                      <i />
                    </i>
                    <span className="Toolbar__default">Stretch</span>
                  </i>
                </label>

                <label className="Toolbar__iconRadioLabel">
                  <input
                    checked={selectedBox.ai === 'baseline'}
                    disabled={!selectedBox.c}
                    name="ai"
                    onChange={(event_) =>
                      dispatch(
                        updateBoxProperty(
                          id,
                          event_.target.name,
                          event_.target.value,
                        ),
                      )
                    }
                    type="radio"
                    value="baseline"
                  />
                  <i className="fbi fbi-ai fbi-ai-baseline">
                    <i className="fbi-items">
                      <i>B</i>
                      <i>B</i>
                    </i>
                    <span>Baseline</span>
                  </i>
                </label>
              </div>

              <h2 className="Toolbar__groupTitle">Affects this box</h2>

              <div className="Toolbar__section">
                <h3>flex</h3>
                <div className="Toolbar__splitSection">
                  <div className={cc({ Toolbar__default: !selectedBox.g })}>
                    <h4>GROW</h4>
                    <div>
                      <button
                        className="Toolbar__nudgeButton"
                        onClick={() =>
                          dispatch(
                            updateBoxProperty(
                              id,
                              'g',
                              selectedBox.g ? selectedBox.g - 1 : 0,
                            ),
                          )
                        }
                        type="button"
                      >
                        <i className="fa fa-minus" />
                      </button>
                      <span className="Toolbar__nudgeText">
                        {selectedBox.g ? selectedBox.g : 0}
                      </span>
                      <button
                        className="Toolbar__nudgeButton"
                        onClick={() =>
                          dispatch(
                            updateBoxProperty(
                              id,
                              'g',
                              selectedBox.g ? selectedBox.g + 1 : 1,
                            ),
                          )
                        }
                        type="button"
                      >
                        <i className="fa fa-plus" />
                      </button>
                    </div>
                  </div>

                  <div
                    className={cc({
                      Toolbar__default: selectedBox.s !== 0 && !selectedBox.s,
                    })}
                  >
                    <h4>SHRINK</h4>
                    <div>
                      <button
                        className="Toolbar__nudgeButton"
                        onClick={() =>
                          dispatch(
                            updateBoxProperty(
                              id,
                              's',
                              selectedBox.s ? selectedBox.s - 1 : 0,
                            ),
                          )
                        }
                        type="button"
                      >
                        <i className="fa fa-minus" />
                      </button>
                      <span className="Toolbar__nudgeText">
                        {selectedBox.s || selectedBox.s === 0
                          ? selectedBox.s
                          : 1}
                      </span>
                      <button
                        className="Toolbar__nudgeButton"
                        onClick={() =>
                          dispatch(
                            updateBoxProperty(
                              id,
                              's',
                              selectedBox.s || selectedBox.s === 0
                                ? selectedBox.s + 1
                                : 2,
                            ),
                          )
                        }
                        type="button"
                      >
                        <i className="fa fa-plus" />
                      </button>
                    </div>
                  </div>

                  <div className={cc({ Toolbar__default: !selectedBox.b })}>
                    <h4>BASIS</h4>
                    <input
                      autoComplete="off"
                      className="Toolbar__basisInput"
                      name="b"
                      onChange={(event_) =>
                        dispatch(
                          updateBoxProperty(
                            id,
                            event_.target.name,
                            event_.target.value,
                          ),
                        )
                      }
                      placeholder="auto"
                      type="text"
                      value={selectedBox.b ? selectedBox.b : ''}
                    />
                  </div>
                </div>
              </div>

              <div className="Toolbar__section">
                <h3>Align Self</h3>
                <label className="Toolbar__iconRadioLabel">
                  <input
                    checked={selectedBox.as === 'flex-start'}
                    name="as"
                    onChange={(event_) =>
                      dispatch(
                        updateBoxProperty(
                          id,
                          event_.target.name,
                          event_.target.value,
                        ),
                      )
                    }
                    type="radio"
                    value="flex-start"
                  />
                  <i className="fbi fbi-as fbi-as-flex-start">
                    <i className="fbi-items">
                      <i />
                    </i>
                    <span>Start</span>
                  </i>
                </label>

                <label className="Toolbar__iconRadioLabel">
                  <input
                    checked={selectedBox.as === 'flex-end'}
                    name="as"
                    onChange={(event_) =>
                      dispatch(
                        updateBoxProperty(
                          id,
                          event_.target.name,
                          event_.target.value,
                        ),
                      )
                    }
                    type="radio"
                    value="flex-end"
                  />
                  <i className="fbi fbi-as fbi-as-flex-end">
                    <i className="fbi-items">
                      <i />
                    </i>
                    <span>End</span>
                  </i>
                </label>

                <label className="Toolbar__iconRadioLabel">
                  <input
                    checked={selectedBox.as === 'center'}
                    name="as"
                    onChange={(event_) =>
                      dispatch(
                        updateBoxProperty(
                          id,
                          event_.target.name,
                          event_.target.value,
                        ),
                      )
                    }
                    type="radio"
                    value="center"
                  />
                  <i className="fbi fbi-as fbi-as-center">
                    <i className="fbi-items">
                      <i />
                    </i>
                    <span>Center</span>
                  </i>
                </label>

                <label className="Toolbar__iconRadioLabel">
                  <input
                    checked={selectedBox.as === 'stretch'}
                    name="as"
                    onChange={(event_) =>
                      dispatch(
                        updateBoxProperty(
                          id,
                          event_.target.name,
                          event_.target.value,
                        ),
                      )
                    }
                    type="radio"
                    value="stretch"
                  />
                  <i className="fbi fbi-as fbi-as-stretch">
                    <i className="fbi-items">
                      <i />
                    </i>
                    <span>Stretch</span>
                  </i>
                </label>

                <label className="Toolbar__iconRadioLabel">
                  <input
                    checked={!selectedBox.as || selectedBox.as === 'auto'}
                    name="as"
                    onChange={(event_) =>
                      dispatch(
                        updateBoxProperty(
                          id,
                          event_.target.name,
                          event_.target.value,
                        ),
                      )
                    }
                    type="radio"
                    value="auto"
                  />
                  <i className="fbi fbi-as fbi-as-auto">
                    <i className="fbi-items">
                      <i>A</i>
                    </i>
                    <span className="Toolbar__default">Auto</span>
                  </i>
                </label>
              </div>
            </div>
          ) : (
            ''
          )
        }
        <div className="Toolbar__intro">
          <div className="Toolbar__introInner">Select a box</div>
        </div>
      </div>
    </div>
  )
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
