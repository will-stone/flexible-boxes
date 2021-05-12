/* eslint-disable react/no-set-state */
import './../css/Css.css'

import React, { Component } from 'react'
import ClipboardButton from 'react-clipboard.js'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

class Css extends Component {
  constructor() {
    super()

    this.state = {
      copyButtonText: 'COPY',
    }

    this.onSuccessfulyCopy = this.onSuccessfulyCopy.bind(this)
  }

  onSuccessfulyCopy() {
    this.setState({
      copyButtonText: 'COPIED!',
    })

    setTimeout(() => {
      this.setState({
        copyButtonText: 'COPY',
      })
    }, 2000)
  }

  render() {
    const { boxes } = this.props

    function buildUpBoxCSSProperties(id) {
      let output = ''

      for (const [property, value] of Object.entries(boxes[id])) {
        switch (property) {
          case 'c':
            output = `${output}  display: flex;\n`
            break

          case 'b':
            output = `${output}  flex-basis: ${value};\n`
            break

          case 'd':
            output = `${output}  flex-direction: column;\n`
            break

          case 'g':
            output = `${output}  flex-grow: ${value};\n`
            break

          case 's':
            output = `${output}  flex-shrink: ${value};\n`
            break

          case 'w':
            output = `${output}  flex-wrap: ${value};\n`
            break

          case 'ac':
            output = `${output}  align-content: ${value};\n`
            break

          case 'ai':
            output = `${output}  align-items: ${value};\n`
            break

          case 'as':
            output = `${output}  align-self: ${value};\n`
            break

          case 'jc':
            output = `${output}  justify-content: ${value};\n`
            break

          default:
            break
        }
      }

      return output
    }

    function buildUpCode(id) {
      let output = ``

      if (boxes[id].c) {
        for (let index = 0; index < boxes[id].c.length; index = index + 1) {
          const compId = boxes[id].c[index]
          const compTitle = boxes[compId].t ? `-${boxes[compId].t}` : ''

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
            output = `${output}.fb__${id}_${compId}${compTitle} {\n`
            output = output + buildUpBoxCSSProperties(compId)
            output = `${output}}\n\n`
          }

          // Children
          if (boxes[compId].c && boxes[compId].c.length > 0) {
            const childOutput = buildUpCode(compId)
            output = output + childOutput
          }
        }
      }

      return output
    }

    const builtCode = buildUpCode(1)

    const rootCompTitle = boxes[1].t ? `-${boxes[1].t}` : ''

    // if first comp is 'body'
    const rootCompStart =
      boxes[1].t && boxes[1].t === 'body'
        ? `height, body {
  height: 100%;
}

body {
  overflow: hidden;`
        : `.fb__1${rootCompTitle} {`

    const css = `${rootCompStart}
${buildUpBoxCSSProperties(1)}}

${builtCode}`

    const { copyButtonText } = this.state

    return (
      <div className="Css Pane__component">
        <h2 className="Pane__title">
          CSS
          <ClipboardButton
            button-className="Pane__titleButton button"
            data-clipboard-text={css}
            onSuccess={() => this.onSuccessfulyCopy()}
          >
            {copyButtonText}
          </ClipboardButton>
        </h2>
        <SyntaxHighlighter language="css" showLineNumbers style={atomOneDark}>
          {css}
        </SyntaxHighlighter>
      </div>
    )
  }
}

export default Css
