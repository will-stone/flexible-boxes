import React, { Component } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/styles/hljs'
import ClipboardButton from 'react-clipboard.js'

import './../css/Css.css'

class Css extends Component {
  constructor() {
    super()

    this.state = {
      copyButtonText: 'COPY'
    }
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
    var boxes = this.props.boxes

    function buildUpBoxCSSProperties(id) {
      var output = ''

      for (var property in boxes[id]) {
        if (boxes[id].hasOwnProperty(property)) {
          var value = boxes[id][property]
          switch (property) {
            case 'c':
              output += '  display: flex;\n'
              break

            case 'b':
              output += `  flex-basis: ${value};\n`
              break

            case 'd':
              output += '  flex-direction: column;\n'
              break

            case 'g':
              output += `  flex-grow: ${value};\n`
              break

            case 's':
              output += `  flex-shrink: ${value};\n`
              break

            case 'w':
              output += `  flex-wrap: ${value};\n`
              break

            case 'ac':
              output += `  align-content: ${value};\n`
              break

            case 'ai':
              output += `  align-items: ${value};\n`
              break

            case 'as':
              output += `  align-self: ${value};\n`
              break

            case 'jc':
              output += `  justify-content: ${value};\n`
              break

            default:
              break
          }
        }
      }

      return output
    }

    function buildUpCode(id) {
      var output = ``

      if (boxes[id].c) {
        for (var i = 0; i < boxes[id].c.length; i++) {
          var compId = boxes[id].c[i]
          let compTitle = boxes[compId].t ? '-' + boxes[compId].t : ''

          // if has any css to set
          if (
            boxes[compId].c ||
            boxes[compId].b ||
            boxes[compId].d ||
            boxes[compId].g ||
            boxes[compId].s ||
            boxes[compId].w ||
            boxes[compId].ac ||
            boxes[compId].ai ||
            boxes[compId].as ||
            boxes[compId].js
          ) {
            output += `.fb__${id}_${compId}${compTitle} {\n`
            output += buildUpBoxCSSProperties(compId)
            output += `}\n\n`
          }

          // Children
          if (boxes[compId].c && boxes[compId].c.length > 0) {
            var childOutput = buildUpCode(compId)
            output += childOutput
          }
        }
      }

      return output
    }

    var builtCode = buildUpCode(1)

    var rootCompTitle = boxes[1].t ? '-' + boxes[1].t : ''

    // if first comp is 'body'
    var rootCompStart
    if (boxes[1].t && boxes[1].t === 'body') {
      rootCompStart = `height, body {
  height: 100%;
}

body {
  overflow: hidden;`
    } else {
      rootCompStart = `.fb__1${rootCompTitle} {`
    }

    var css = `${rootCompStart}
${buildUpBoxCSSProperties(1)}}

${builtCode}`

    return (
      <div className="Css Pane__component">
        <h2 className="Pane__title">
          CSS
          <ClipboardButton
            button-className="Pane__titleButton button"
            data-clipboard-text={css}
            onSuccess={this.onSuccessfulyCopy.bind(this)}
          >
            {this.state.copyButtonText}
          </ClipboardButton>
        </h2>
        <SyntaxHighlighter language="css" style={atomOneDark} showLineNumbers={true}>
          {css}
        </SyntaxHighlighter>
      </div>
    )
  }
}

export default Css
