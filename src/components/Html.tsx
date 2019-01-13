import React, { Component } from 'react'
import ClipboardButton from 'react-clipboard.js'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/styles/hljs'
import { IBox } from '../model'
import './../css/Html.css'

class Html extends Component<{ boxes: IBox[] }> {
  // public state = {
  //   copyButtonText: 'COPY',
  // }

  // public onSuccessfulyCopy() {
  //   this.setState({
  //     copyButtonText: 'COPIED!',
  //   })

  //   setTimeout(() => {
  //     this.setState({
  //       copyButtonText: 'COPY',
  //     })
  //   }, 2000)
  // }

  public render() {
    //     const boxes = this.props.boxes as any

    //     function buildUpCode(id: any, indentMultiplier: any) {
    //       let output = `` as any
    //       indentMultiplier++
    //       const indent = repeat('  ', indentMultiplier)

    //       if (boxes[id].c) {
    //         for (let i = 0; i < boxes[id].c.length; i++) {
    //           const compId = boxes[id].c[i]
    //           output += `${indent}<div class="fb fb__${id}_${compId}${
    //             boxes[compId].t ? '-' + boxes[compId].t : ''
    //           }">\n`

    //           // Children
    //           if (boxes[compId].c && boxes[compId].c.length > 0) {
    //             const childOutput = buildUpCode(compId, indentMultiplier)
    //             output += childOutput
    //           } else {
    //             output += `${indent}  <!-- ${boxes[compId].t || id} -->\n\n`
    //           }

    //           output += `${indent}</div>\n`
    //         }
    //       }
    //       return output
    //     }

    //     const builtCode = buildUpCode(1, 0)

    //     const rootCompTitle = boxes[1].t ? '-' + boxes[1].t : ''

    //     // if first comp is 'body'
    //     let rootCompStart, rootCompEnd
    //     if (boxes[1].t && boxes[1].t === 'body') {
    //       rootCompStart = '<body>'
    //       rootCompEnd = '</body>'
    //     } else {
    //       rootCompStart = `<div class="fb fb__1${rootCompTitle}">`
    //       rootCompEnd = '</div>'
    //     }

    //     const rootComment = boxes[1].c ? '' : `  <!-- fb__1${rootCompTitle} -->\n`

    //     const html = `${rootCompStart}
    // ${rootComment}${builtCode}${rootCompEnd}`

    return (
      <div className="Html Pane__component">
        <h2 className="Pane__title">
          HTML
          <ClipboardButton
            button-className="Pane__titleButton button"
            // data-clipboard-text={html}
            // onSuccess={this.onSuccessfulyCopy.bind(this)}
          >
            {/* {this.state.copyButtonText} */}
            Copy
          </ClipboardButton>
        </h2>
        <SyntaxHighlighter language="html" style={atomOneDark} showLineNumbers={true}>
          {/* {html} */}
          {'<div />'}
        </SyntaxHighlighter>
      </div>
    )
  }
}

export default Html
