import React, { Component } from 'react';
import "./Header.css";
import {DropdownButton, MenuItem, ButtonToolbar} from 'react-bootstrap';
import logo from './logo.png';


const buttonsInstance = (
<ButtonToolbar>
    <DropdownButton
        bsStyle={"default"}
        title={<i class="fa fa-bars"></i>}
        noCaret
        id="dropdown-no-caret"
    >
        <MenuItem eventKey="1">About</MenuItem>
    </DropdownButton>
</ButtonToolbar>
);

class Header extends Component {


    render() {
        let logoName;

        if(this.props.width>"390"){
            logoName = <div className="logoName">
                        <h1>KAZE</h1>
                        <h1>BUS MAP</h1>
                    </div>;
        }else {
            logoName =  <div className="logoName">
                        
                    </div>;
        }
        return (
        <header>
            <div className="logo">
                <a href='/'>
                    <div className="logoContent">
                        <div className="logoImage">
                            <img src={logo} alt="logo"></img>
                        </div>
                        {logoName}
                    </div>
                </a>
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