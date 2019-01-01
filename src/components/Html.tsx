import repeat from 'lodash/repeat'
import React, { Component } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/styles/hljs'
import ClipboardButton from 'react-clipboard.js'

import './../css/Html.css'
import { IBoxes } from '../containers/App'

class Html extends Component<{ boxes: IBoxes }> {
  state = {
    copyButtonText: 'COPY'
  }

  onSuccessfulyCopy() {
    this.setState({
      copyButtonText: 'COPIED!'
    })

    setTimeout(() => {
      this.setState({
        copyButtonText: 'COPY'
      })
    }, 2000)
  }

  render() {
    var boxes = this.props.boxes as any

    function buildUpCode(id: any, indentMultiplier: any) {
      var output = `` as any
      indentMultiplier++
      let indent = repeat('  ', indentMultiplier)

      if (boxes[id].c) {
        for (var i = 0; i < boxes[id].c.length; i++) {
          var compId = boxes[id].c[i]
          output += `${indent}<div class="fb fb__${id}_${compId}${
            boxes[compId].t ? '-' + boxes[compId].t : ''
          }">\n`

          // Children
          if (boxes[compId].c && boxes[compId].c.length > 0) {
            var childOutput = buildUpCode(compId, indentMultiplier)
            output += childOutput
          } else {
            output += `${indent}  <!-- ${boxes[compId].t || id} -->\n\n`
          }

          output += `${indent}</div>\n`
        }
      }
      return output
    }

    var builtCode = buildUpCode(1, 0)

    var rootCompTitle = boxes[1].t ? '-' + boxes[1].t : ''

    // if first comp is 'body'
    var rootCompStart, rootCompEnd
    if (boxes[1].t && boxes[1].t === 'body') {
      rootCompStart = '<body>'
      rootCompEnd = '</body>'
    } else {
      rootCompStart = `<div class="fb fb__1${rootCompTitle}">`
      rootCompEnd = '</div>'
    }

    var rootComment = boxes[1].c ? '' : `  <!-- fb__1${rootCompTitle} -->\n`

    var html = `${rootCompStart}
${rootComment}${builtCode}${rootCompEnd}`

    return (
      <div className="Html Pane__component">
        <h2 className="Pane__title">
          HTML
          <ClipboardButton
            button-className="Pane__titleButton button"
            data-clipboard-text={html}
            onSuccess={this.onSuccessfulyCopy.bind(this)}
          >
            {this.state.copyButtonText}
          </ClipboardButton>
        </h2>
        <SyntaxHighlighter language="html" style={atomOneDark} showLineNumbers={true}>
          {html}
        </SyntaxHighlighter>
      </div>
    )
  }
}

export default Html
