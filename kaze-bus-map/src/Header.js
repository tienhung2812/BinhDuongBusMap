import React, { Component } from 'react';
import "./Header.css";
import {DropdownButton, MenuItem, ButtonToolbar} from 'react-bootstrap';
import logo from './logo.png';

var FontAwesome = require('react-fontawesome');

const buttonsInstance = (
<ButtonToolbar>
    <DropdownButton
        bsStyle="default"
        title="No caret"
        noCaret
        id="dropdown-no-caret"
    >
        <MenuItem eventKey="1">Action</MenuItem>
        <MenuItem eventKey="2">Another action</MenuItem>
        <MenuItem eventKey="3">Something else here</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey="4">Separated link</MenuItem>
    </DropdownButton>
</ButtonToolbar>
);

class Header extends Component {
  render() {
    return (
      <header>
        <div className="logo">
            <div className="logoContent">
                <div className="logoImage">
                    <img src={logo} alt="logo"></img>
                </div>
                <div className="logoName">
                    <h1>KAZE</h1>
                    <h1>BUS MAP</h1>
                </div>
            </div>
        </div>
        <div className="menu">
            <div className="menuContent">
                {buttonsInstance}
            </div>
            
        </div>
      </header>
    );
  }
}
export default Header;