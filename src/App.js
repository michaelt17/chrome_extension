import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './Components/HomePage.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        {this.props.children}
      </div>
    );
  }
}

export default App;
