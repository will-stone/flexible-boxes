import React, { Component } from 'react'
import ClipboardButton from 'react-clipboard.js'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/styles/hljs'
import { IBox } from '../model'
import { boxesToHTML } from '../utils/boxes.toHTML'
import './../css/Html.css'

class Html extends Component<{ boxes: IBox[] }> {
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
    const html = boxesToHTML(this.props.boxes)
    return (
      <div className="Html Pane__component">
        <h2 className="Pane__title">
          HTML
          <ClipboardButton
            button-className="Pane__titleButton button"
            data-clipboard-text={html}
            onSuccess={this.onSuccessfulyCopy}
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
