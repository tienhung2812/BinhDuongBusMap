import React, { Component } from 'react';
import './App.css';
import 'react-fontawesome';
import Header from './Header';
import Sidebar from './Sidebar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
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
  render() {
    return (
      <div className="App">
        <Header width={this.state.width} height={this.state.height}/>
        <Sidebar width={this.state.width} height={this.state.height}/>
      </div>
    );
  }
}

export default App;
