/* eslint-disable unicorn/no-null */
import './../css/Sitebar.css'

import React from 'react'

function Sitebar({ onSelectBox }) {
  return (
    <div className="Sitebar">
      <h1 className="Sitebar__logo">Flexible Boxes</h1>
      <h2 className="Sitebar__subTitle">
        By{' '}
        <a
          className="button button--link"
          href="http://wstone.io/flexible-boxes-react-app/"
        >
          Will Stone
        </a>
      </h2>

      <hr />

      <h4 className="Sitebar__sectionHeading">PRESETS</h4>
      <div className="Sitebar__actions">
        <a
          className="Sitebar__button button"
          href="#~(1~(c~(~2~3~4)~d~'column~t~'body)~2~(t~'header~c~(~5~6~7)~jc~'flex-end)~3~(t~'main~g~1)~4~(t~'footer~c~(~8)~jc~'center)~5~(t~'logo)~6~(g~1~t~'spacer)~7~(t~'navigation)~8~(t~'logo))"
          onClick={() => onSelectBox(null)}
        >
          SIMPLE
        </a>
        <a
          className="Sitebar__button button"
          href="#~(1~(t~'container~c~(~2)~jc~'center~ai~'center)~2~(t~'centered))"
          onClick={() => onSelectBox(null)}
        >
          CENTERED
        </a>
        <a
          className="Sitebar__button button"
          href="#~(1~(c~(~2~3~4)~t~'body~d~'column)~2~(t~'header)~3~(g~1~c~(~5~6~7))~4~(t~'footer)~5~(t~'sidebar)~6~(t~'main~g~1)~7~(t~'sidebar))"
          onClick={() => onSelectBox(null)}
        >
          HOLY GRAIL
        </a>
      </div>

      <hr />

      <ul>
        <li>
          <a
            className="button button--link"
            href="https://github.com/will-stone/flexible-boxes/issues"
          >
            <i className="fa fa-github" /> Issues?
          </a>
        </li>
        <li>
          <a
            className="button button--link"
            href="https://twitter.com/will_stone_"
          >
            <i className="fa fa-twitter" /> will_stone_
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Sitebar
