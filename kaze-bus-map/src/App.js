import React, { Component } from 'react';
import './App.css';
import 'react-fontawesome';
import Header from './Header';
import Sidebar from './Sidebar';
import Map from './Map';
import preloader from "./preloading.gif"

var lang = localStorage.getItem('lang');

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 ,lang: lang, displaySidebar:true};
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
    
  componentDidMount() {
  this.updateWindowDimensions();
  window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
  window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
  this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  handleLangChange = event => {
    this.setState({lang: (event)});
  }

  handleCloseSidebar = event =>{
    if(event){
      this.setState({displaySidebar:false})
    }
    else
      this.setState({displaySidebar:true})
  }

  render() {
    return (
      <div className="App">
        <Header width={this.state.width} height={this.state.height} lang={this.handleLangChange}/>
        <Sidebar width={this.state.width} height={this.state.height} lang={this.state.lang} closeSidebar={this.handleCloseSidebar} preloader={preloader}/>
        <Map width={this.state.width} height={this.state.height} lang={this.state.lang} displaySidebar={this.state.displaySidebar}/>
      </div>
    );
  }
}

export default App;
