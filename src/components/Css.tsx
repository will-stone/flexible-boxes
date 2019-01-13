import React, { Component } from 'react'
import ClipboardButton from 'react-clipboard.js'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/styles/hljs'
import { IBox } from '../model'
import { boxesToCSS } from '../utils/boxes.toCSS'
import './../css/Css.css'

class Css extends Component<{ boxes: IBox[] }> {
  public state = {
    copyButtonText: 'COPY',
  }

  public onSuccessfulyCopy = () => {
    this.setState({
      copyButtonText: 'COPIED!',
    })

    setTimeout(() => {
      this.setState({
        copyButtonText: 'COPY',
      })
    }, 2000)
  }

  public render() {
    const css = boxesToCSS(this.props.boxes)
    return (
      <div className="Css Pane__component">
        <h2 className="Pane__title">
          CSS
          <ClipboardButton
            button-className="Pane__titleButton button"
            data-clipboard-text={css}
            onSuccess={this.onSuccessfulyCopy}
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
