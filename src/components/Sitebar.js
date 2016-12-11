import React, { Component } from 'react';

import './../css/Sitebar.css';

class Sitebar extends Component {
  render() {

    var selectBox = this.props.handleSelectBox;

    return (
      <div className="Sitebar">
        <h1 className="Sitebar__logo">Flexible Boxes</h1>
        <h2 className="Sitebar__subTitle">By <a className="button button--link" href="http://wstone.io/">Will Stone</a></h2>

        <hr/>

        <h4 className="Sitebar__sectionHeading">PRESETS</h4>
        <div className="Sitebar__actions">
          <a className="Sitebar__button button" href="#~(1~(c~(~2~3~4)~d~'column~t~'body)~2~(t~'header~c~(~5~6~7)~jc~'flex-end)~3~(t~'main~g~1)~4~(t~'footer~c~(~8)~jc~'center)~5~(t~'logo)~6~(g~1~t~'spacer)~7~(t~'navigation)~8~(t~'logo))" onClick={() => selectBox(null)}>SIMPLE</a>
          <a className="Sitebar__button button" href="#~(1~(t~'container~c~(~2)~jc~'center~ai~'center)~2~(t~'centered))" onClick={() => selectBox(null)}>CENTERED</a>
          <a className="Sitebar__button button" href="#~(1~(t~'body~d~'column~c~(~2~3~4))~2~(t~'header~b~'10*25)~3~(t~'main~g~1~c~(~5~6~7))~4~(t~'footer~b~'10*25)~5~(t~'sidebarL~s~0~b~'150px)~6~(g~1)~7~(t~'sidebarR~s~0~b~'150px))" onClick={() => selectBox(null)}>HOLY GRAIL</a>
        </div>

        <hr/>

        <ul>
          <li><a href="#" className="button button--link"><i className="fa fa-github"/> Source</a></li>
          <li><a href="https://twitter.com/wstone_io" className="button button--link"><i className="fa fa-twitter"/> wstone_io</a></li>
        </ul>

      </div>
    );
  }
}

export default Sitebar;