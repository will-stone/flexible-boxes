import React, { Component } from 'react'
import { IBox } from '../model'
import './../css/Sitebar.css'

class Sitebar extends Component<{ onSetBoxes: (boxes: IBox[]) => void }> {
  public render() {
    return (
      <div className="Sitebar">
        <h1 className="Sitebar__logo">Flexible Boxes</h1>
        <h2 className="Sitebar__subTitle">
          By{' '}
          <a className="button button--link" href="http://wstone.io/flexible-boxes-react-app/">
            Will Stone
          </a>
        </h2>

        <hr />

        <h4 className="Sitebar__sectionHeading">PRESETS</h4>
        <div className="Sitebar__actions">
          <button
            className="Sitebar__button button"
            onClick={() =>
              this.props.onSetBoxes([
                {
                  t: 'body',
                  c: [
                    { t: 'header', c: [{ t: 'logo' }, { t: 'spacer', g: 1 }, { t: 'navigation' }] },
                    { t: 'main', g: 1 },
                    { t: 'footer', c: [{ t: 'logo' }], jc: 'center' },
                  ],
                  d: 'column',
                },
              ])
            }
          >
            SIMPLE
          </button>
          <button
            className="Sitebar__button button"
            onClick={() =>
              this.props.onSetBoxes([
                { t: 'container', c: [{ t: 'centered' }], jc: 'center', ai: 'center' },
              ])
            }
          >
            CENTERED
          </button>
          <button
            className="Sitebar__button button"
            onClick={() =>
              this.props.onSetBoxes([
                {
                  t: 'body',
                  c: [
                    { t: 'header' },
                    {
                      g: 1,
                      c: [{ t: 'sidebar' }, { t: 'main', g: 1 }, { t: 'sidebar' }],
                    },
                    { t: 'footer', jc: 'center' },
                  ],
                  d: 'column',
                },
              ])
            }
          >
            HOLY GRAIL
          </button>
        </div>

        <hr />

        <ul>
          <li>
            <a
              href="https://github.com/will-stone/flexible-boxes/issues"
              className="button button--link"
            >
              <i className="fa fa-github" /> Issues?
            </a>
          </li>
          <li>
            <a href="https://twitter.com/will_stone_" className="button button--link">
              <i className="fa fa-twitter" /> will_stone_
            </a>
          </li>
        </ul>
      </div>
    )
  }
}

export default Sitebar
