import './../css/Html.css'

import repeat from 'lodash/repeat'
import React, { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useSelector } from 'react-redux'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

function Html() {
  const boxes = useSelector((state) => state.ui.boxes)

  const [copyButtonText, setCopyButtonText] = useState('COPY')

  function onSuccessfulCopy() {
    setCopyButtonText('COPIED!')
    setTimeout(() => {
      setCopyButtonText('COPY')
    }, 2000)
  }

  function buildUpCode(id, indentMultiplier = 0) {
    let output = ``
    const indentMultiplierUpdated = indentMultiplier + 1
    const indent = repeat('  ', indentMultiplierUpdated)

    if (boxes[id].c) {
      for (let index = 0; index < boxes[id].c.length; index = index + 1) {
        const compId = boxes[id].c[index]
        output = `${output}${indent}<div class="fb fb__${id}_${compId}${
          boxes[compId].t ? `-${boxes[compId].t}` : ''
        }">\n`

        // Children
        if (boxes[compId].c && boxes[compId].c.length > 0) {
          const childOutput = buildUpCode(compId, indentMultiplierUpdated)
          output = output + childOutput
        } else {
          output = `${output}${indent}  <!-- ${boxes[compId].t || id} -->\n\n`
        }

        output = `${output}${indent}</div>\n`
      }
    }

    return output
  }

  const builtCode = buildUpCode(1, 0)

  const rootCompTitle = boxes[1].t ? `-${boxes[1].t}` : ''

  // if first comp is 'body'
  let rootCompStart
  let rootCompEnd
  if (boxes[1].t && boxes[1].t === 'body') {
    rootCompStart = '<body>'
    rootCompEnd = '</body>'
  } else {
    rootCompStart = `<div class="fb fb__1${rootCompTitle}">`
    rootCompEnd = '</div>'
  }

  const rootComment = boxes[1].c ? '' : `  <!-- fb__1${rootCompTitle} -->\n`

  const html = `${rootCompStart}
${rootComment}${builtCode}${rootCompEnd}

`

  return (
    <div className="Html Pane__component">
      <h2 className="Pane__title">
        HTML
        <CopyToClipboard onCopy={onSuccessfulCopy} text={html}>
          <button className="Pane__titleButton button" type="button">
            {copyButtonText}
          </button>
        </CopyToClipboard>
      </h2>
      <SyntaxHighlighter language="html" showLineNumbers style={atomOneDark}>
        {html}
      </SyntaxHighlighter>
    </div>
  )
}

export default Html
