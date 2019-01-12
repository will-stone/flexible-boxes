import cc from 'classcat'
import React, { Component } from 'react'
import './../css/Toolbar.css'
import { IBox } from '../model'
import { TSelectedBoxPath } from '../containers/App'

class Toolbar extends Component<{
  resetBox: (path: number[]) => void
  selectedBoxPath: TSelectedBoxPath
  updateBox: (path: number[], key: keyof IBox, value: any) => void
  nudge: (...any: any[]) => void
  boxes: [IBox]
}> {
  render() {
    // var thisBox = this.props.selectedBoxId && this.props.boxes[this.props.selectedBoxId]

    return (
      <div />
      //   <div
      //     className={cc([
      //       'Toolbar Pane__component',
      //       { 'Toolbar--isOpen': thisBox },
      //       {
      //         'Toolbar--isColumn': thisBox && thisBox.d && thisBox.d === 'column'
      //       }
      //     ])}
      //   >
      //     <h2 className="Pane__title">
      //       TOOLBAR
      //       {thisBox && (
      //         <button
      //           className="Pane__titleButton button"
      //           onClick={this.props.resetBox.bind(this, this.props.selectedBoxId)}
      //         >
      //           DEFAULT
      //         </button>
      //       )}
      //     </h2>
      //     <div className="Toolbar__scroller">
      //       {/* Only show toolbar if box is selected */
      //       thisBox ? (
      //         <div className="Toolbar__tools">
      //           <h2
      //             className={cc([
      //               'Toolbar__groupTitle',
      //               {
      //                 Toolbar__disabled: !thisBox.c
      //               }
      //             ])}
      //           >
      //             Affects child boxes
      //           </h2>

      //           <div className="Toolbar__section">
      //             <h3 className={cc({ Toolbar__disabled: !thisBox.c })}>Flow</h3>
      //             <div className="Toolbar__splitSection">
      //               <div>
      //                 <h4 className={cc({ Toolbar__disabled: !thisBox.c })}>Direction</h4>
      //                 <label className="Toolbar__iconRadioLabel">
      //                   <input
      //                     type="radio"
      //                     name="d"
      //                     value="row"
      //                     checked={!thisBox.d || thisBox.d === 'row'}
      //                     onChange={e => this.props.updateBox(e, this.props.selectedBoxId)}
      //                     disabled={!thisBox.c}
      //                   />
      //                   <i className="fbi fbi-row">
      //                     <i className="fbi-items">
      //                       <i />
      //                       <i />
      //                       <i />
      //                     </i>
      //                     <span className="Toolbar__default">Row</span>
      //                   </i>
      //                 </label>
      //                 <label className="Toolbar__iconRadioLabel">
      //                   <input
      //                     type="radio"
      //                     name="d"
      //                     value="column"
      //                     checked={thisBox.d === 'column'}
      //                     onChange={e => this.props.updateBox(e, this.props.selectedBoxId)}
      //                     disabled={!thisBox.c}
      //                   />
      //                   <i className="fbi fbi-column">
      //                     <i className="fbi-items">
      //                       <i />
      //                       <i />
      //                       <i />
      //                     </i>
      //                     <span>Column</span>
      //                   </i>
      //                 </label>
      //               </div>

      //               <div>
      //                 <h4 className={cc({ Toolbar__disabled: !thisBox.c })}>Wrap</h4>
      //                 <label className="Toolbar__iconRadioLabel">
      //                   <input
      //                     type="radio"
      //                     name="w"
      //                     value="nowrap"
      //                     checked={!thisBox.w || thisBox.w === 'nowrap'}
      //                     onChange={e => this.props.updateBox(e, this.props.selectedBoxId)}
      //                     disabled={!thisBox.c}
      //                   />
      //                   <i className="fbi fbi-nowrap">
      //                     <i className="fbi-items">
      //                       <i />
      //                       <i />
      //                       <i />
      //                       <i />
      //                       <i />
      //                       <i />
      //                     </i>
      //                     <span className="Toolbar__default">Nowrap</span>
      //                   </i>
      //                 </label>
      //                 <label className="Toolbar__iconRadioLabel">
      //                   <input
      //                     type="radio"
      //                     name="w"
      //                     value="wrap"
      //                     checked={thisBox.w === 'wrap'}
      //                     onChange={e => this.props.updateBox(e, this.props.selectedBoxId)}
      //                     disabled={!thisBox.c}
      //                   />
      //                   <i className="fbi fbi-wrap">
      //                     <i className="fbi-items">
      //                       <i />
      //                       <i />
      //                       <i />
      //                       <i />
      //                       <i />
      //                       <i />
      //                     </i>
      //                     <span>Wrap</span>
      //                   </i>
      //                 </label>
      //               </div>
      //             </div>
      //           </div>

      //           <div className="Toolbar__section">
      //             <h3 className={cc({ Toolbar__disabled: !thisBox.c })}>Justify Content</h3>
      //             <label className="Toolbar__iconRadioLabel">
      //               <input
      //                 type="radio"
      //                 name="jc"
      //                 value="flex-start"
      //                 checked={!thisBox.jc || thisBox.jc === 'flex-start'}
      //                 onChange={e => this.props.updateBox(e, this.props.selectedBoxId)}
      //                 disabled={!thisBox.c}
      //               />
      //               <i className="fbi fbi-jc fbi-jc-flex-start">
      //                 <i className="fbi-items">
      //                   <i />
      //                   <i />
      //                 </i>
      //                 <span className="Toolbar__default">Start</span>
      //               </i>
      //             </label>

      //             <label className="Toolbar__iconRadioLabel">
      //               <input
      //                 type="radio"
      //                 name="jc"
      //                 value="flex-end"
      //                 checked={thisBox.jc === 'flex-end'}
      //                 onChange={e => this.props.updateBox(e, this.props.selectedBoxId)}
      //                 disabled={!thisBox.c}
      //               />
      //               <i className="fbi fbi-jc fbi-jc-flex-end">
      //                 <i className="fbi-items">
      //                   <i />
      //                   <i />
      //                 </i>
      //                 <span>End</span>
      //               </i>
      //             </label>

      //             <label className="Toolbar__iconRadioLabel">
      //               <input
      //                 type="radio"
      //                 name="jc"
      //                 value="center"
      //                 checked={thisBox.jc === 'center'}
      //                 onChange={e => this.props.updateBox(e, this.props.selectedBoxId)}
      //                 disabled={!thisBox.c}
      //               />
      //               <i className="fbi fbi-jc fbi-jc-center">
      //                 <i className="fbi-items">
      //                   <i />
      //                   <i />
      //                 </i>
      //                 <span>Center</span>
      //               </i>
      //             </label>

      //             <label className="Toolbar__iconRadioLabel">
      //               <input
      //                 type="radio"
      //                 name="jc"
      //                 value="space-between"
      //                 checked={thisBox.jc === 'space-between'}
      //                 onChange={e => this.props.updateBox(e, this.props.selectedBoxId)}
      //                 disabled={!thisBox.c}
      //               />
      //               <i className="fbi fbi-jc fbi-jc-space-between">
      //                 <i className="fbi-items">
      //                   <i />
      //                   <i />
      //                 </i>
      //                 <span>Between</span>
      //               </i>
      //             </label>

      //             <label className="Toolbar__iconRadioLabel">
      //               <input
      //                 type="radio"
      //                 name="jc"
      //                 value="space-around"
      //                 checked={thisBox.jc === 'space-around'}
      //                 onChange={e => this.props.updateBox(e, this.props.selectedBoxId)}
      //                 disabled={!thisBox.c}
      //               />
      //               <i className="fbi fbi-jc fbi-jc-space-around">
      //                 <i className="fbi-items">
      //                   <i />
      //                   <i />
      //                 </i>
      //                 <span>Around</span>
      //               </i>
      //             </label>
      //           </div>

      //           <div className="Toolbar__section">
      //             <h3 className={cc({ Toolbar__disabled: !thisBox.c })}>Align Items</h3>

      //             <label className="Toolbar__iconRadioLabel">
      //               <input
      //                 type="radio"
      //                 name="ai"
      //                 value="flex-start"
      //                 checked={thisBox.ai === 'flex-start'}
      //                 onChange={e => this.props.updateBox(e, this.props.selectedBoxId)}
      //                 disabled={!thisBox.c}
      //               />
      //               <i className="fbi fbi-ai fbi-ai-flex-start">
      //                 <i className="fbi-items">
      //                   <i />
      //                   <i />
      //                 </i>
      //                 <span>Start</span>
      //               </i>
      //             </label>

      //             <label className="Toolbar__iconRadioLabel">
      //               <input
      //                 type="radio"
      //                 name="ai"
      //                 value="flex-end"
      //                 checked={thisBox.ai === 'flex-end'}
      //                 onChange={e => this.props.updateBox(e, this.props.selectedBoxId)}
      //                 disabled={!thisBox.c}
      //               />
      //               <i className="fbi fbi-ai fbi-ai-flex-end">
      //                 <i className="fbi-items">
      //                   <i />
      //                   <i />
      //                 </i>
      //                 <span>End</span>
      //               </i>
      //             </label>

      //             <label className="Toolbar__iconRadioLabel">
      //               <input
      //                 type="radio"
      //                 name="ai"
      //                 value="center"
      //                 checked={thisBox.ai === 'center'}
      //                 onChange={e => this.props.updateBox(e, this.props.selectedBoxId)}
      //                 disabled={!thisBox.c}
      //               />
      //               <i className="fbi fbi-ai fbi-ai-center">
      //                 <i className="fbi-items">
      //                   <i />
      //                   <i />
      //                 </i>
      //                 <span>Center</span>
      //               </i>
      //             </label>

      //             <label className="Toolbar__iconRadioLabel">
      //               <input
      //                 type="radio"
      //                 name="ai"
      //                 value="stretch"
      //                 checked={!thisBox.ai || thisBox.ai === 'stretch'}
      //                 onChange={e => this.props.updateBox(e, this.props.selectedBoxId)}
      //                 disabled={!thisBox.c}
      //               />
      //               <i className="fbi fbi-ai fbi-ai-stretch">
      //                 <i className="fbi-items">
      //                   <i />
      //                   <i />
      //                 </i>
      //                 <span className="Toolbar__default">Stretch</span>
      //               </i>
      //             </label>

      //             <label className="Toolbar__iconRadioLabel">
      //               <input
      //                 type="radio"
      //                 name="ai"
      //                 value="baseline"
      //                 checked={thisBox.ai === 'baseline'}
      //                 onChange={e => this.props.updateBox(e, this.props.selectedBoxId)}
      //                 disabled={!thisBox.c}
      //               />
      //               <i className="fbi fbi-ai fbi-ai-baseline">
      //                 <i className="fbi-items">
      //                   <i>B</i>
      //                   <i>B</i>
      //                 </i>
      //                 <span>Baseline</span>
      //               </i>
      //             </label>
      //           </div>

      //           <h2 className="Toolbar__groupTitle">Affects this box</h2>

      //           <div className="Toolbar__section">
      //             <h3>flex</h3>
      //             <div className="Toolbar__splitSection">
      //               <div className={cc({ Toolbar__default: !thisBox.g })}>
      //                 <h4>GROW</h4>
      //                 <div>
      //                   <button
      //                     className="Toolbar__nudgeButton"
      //                     onClick={this.props.nudge.bind(
      //                       this,
      //                       this.props.selectedBoxId,
      //                       'g',
      //                       thisBox.g ? thisBox.g - 1 : 0
      //                     )}
      //                   >
      //                     <i className="fa fa-minus" />
      //                   </button>
      //                   <span className="Toolbar__nudgeText">{thisBox.g ? thisBox.g : 0}</span>
      //                   <button
      //                     className="Toolbar__nudgeButton"
      //                     onClick={this.props.nudge.bind(
      //                       this,
      //                       this.props.selectedBoxId,
      //                       'g',
      //                       thisBox.g ? thisBox.g + 1 : 1
      //                     )}
      //                   >
      //                     <i className="fa fa-plus" />
      //                   </button>
      //                 </div>
      //               </div>

      //               <div
      //                 className={cc({
      //                   Toolbar__default: thisBox.s !== 0 && !thisBox.s
      //                 })}
      //               >
      //                 <h4>SHRINK</h4>
      //                 <div>
      //                   <button
      //                     className="Toolbar__nudgeButton"
      //                     onClick={this.props.nudge.bind(
      //                       this,
      //                       this.props.selectedBoxId,
      //                       's',
      //                       thisBox.s ? thisBox.s - 1 : 0
      //                     )}
      //                   >
      //                     <i className="fa fa-minus" />
      //                   </button>
      //                   <span className="Toolbar__nudgeText">
      //                     {thisBox.s || thisBox.s === 0 ? thisBox.s : 1}
      //                   </span>
      //                   <button
      //                     className="Toolbar__nudgeButton"
      //                     onClick={this.props.nudge.bind(
      //                       this,
      //                       this.props.selectedBoxId,
      //                       's',
      //                       thisBox.s || thisBox.s === 0 ? thisBox.s + 1 : 2
      //                     )}
      //                   >
      //                     <i className="fa fa-plus" />
      //                   </button>
      //                 </div>
      //               </div>

      //               <div className={cc({ Toolbar__default: !thisBox.b })}>
      //                 <h4>BASIS</h4>
      //                 <input
      //                   className="Toolbar__basisInput"
      //                   type="text"
      //                   name="b"
      //                   placeholder="auto"
      //                   value={thisBox.b ? thisBox.b : ''}
      //                   onChange={e => this.props.updateBox(e, this.props.selectedBoxId)}
      //                   autoComplete="off"
      //                 />
      //               </div>
      //             </div>
      //           </div>

      //           <div className="Toolbar__section">
      //             <h3>Align Self</h3>
      //             <label className="Toolbar__iconRadioLabel">
      //               <input
      //                 type="radio"
      //                 name="as"
      //                 value="flex-start"
      //                 checked={thisBox.as === 'flex-start'}
      //                 onChange={e => this.props.updateBox(e, this.props.selectedBoxId)}
      //               />
      //               <i className="fbi fbi-as fbi-as-flex-start">
      //                 <i className="fbi-items">
      //                   <i />
      //                 </i>
      //                 <span>Start</span>
      //               </i>
      //             </label>

      //             <label className="Toolbar__iconRadioLabel">
      //               <input
      //                 type="radio"
      //                 name="as"
      //                 value="flex-end"
      //                 checked={thisBox.as === 'flex-end'}
      //                 onChange={e => this.props.updateBox(e, this.props.selectedBoxId)}
      //               />
      //               <i className="fbi fbi-as fbi-as-flex-end">
      //                 <i className="fbi-items">
      //                   <i />
      //                 </i>
      //                 <span>End</span>
      //               </i>
      //             </label>

      //             <label className="Toolbar__iconRadioLabel">
      //               <input
      //                 type="radio"
      //                 name="as"
      //                 value="center"
      //                 checked={thisBox.as === 'center'}
      //                 onChange={e => this.props.updateBox(e, this.props.selectedBoxId)}
      //               />
      //               <i className="fbi fbi-as fbi-as-center">
      //                 <i className="fbi-items">
      //                   <i />
      //                 </i>
      //                 <span>Center</span>
      //               </i>
      //             </label>

      //             <label className="Toolbar__iconRadioLabel">
      //               <input
      //                 type="radio"
      //                 name="as"
      //                 value="stretch"
      //                 checked={thisBox.as === 'stretch'}
      //                 onChange={e => this.props.updateBox(e, this.props.selectedBoxId)}
      //               />
      //               <i className="fbi fbi-as fbi-as-stretch">
      //                 <i className="fbi-items">
      //                   <i />
      //                 </i>
      //                 <span>Stretch</span>
      //               </i>
      //             </label>

      //             <label className="Toolbar__iconRadioLabel">
      //               <input
      //                 type="radio"
      //                 name="as"
      //                 value="auto"
      //                 checked={!thisBox.as || thisBox.as === 'auto'}
      //                 onChange={e => this.props.updateBox(e, this.props.selectedBoxId)}
      //               />
      //               <i className="fbi fbi-as fbi-as-auto">
      //                 <i className="fbi-items">
      //                   <i>A</i>
      //                 </i>
      //                 <span className="Toolbar__default">Auto</span>
      //               </i>
      //             </label>
      //           </div>
      //         </div>
      //       ) : (
      //         ''
      //       )}
      //       <div className="Toolbar__intro">
      //         <div className="Toolbar__introInner">Select a box</div>
      //       </div>
      //     </div>
      //   </div>
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
