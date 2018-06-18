import React, { Component } from 'react';
import "./Header.css";
import logo from './logo.png';

var storageLang = localStorage.getItem('lang');

class Header extends Component {

    state = {
        options: [
          {
            name: 'Tiếng Việt',
            value: "vi",
          },
          {
            name: 'English',
            value: 'en',
          },
          {
            name: '日本語',
            value: 'jp',
          }
        ],
        value: null,
        firstStart: true
      };
    

    handleChange = (event) => {
        this.setState({ value: event.target.value });
        this.props.lang(event.target.value)
        localStorage.setItem('lang',event.target.value);     
    };

    
    render() {
        let logoName;
        const { options, value, firstStart } = this.state;
        if(firstStart){
            if(storageLang!==value){
                this.setState({value: storageLang})
            }  
            this.setState({firstStart:false})
        }
        const buttonsInstance = (
            <select onChange={this.handleChange} value={value}>
                {options.map(item => (
                <option key={item.value} value={item.value}>
                    {item.name}
                </option>
                ))}
            </select> 
        );
        
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