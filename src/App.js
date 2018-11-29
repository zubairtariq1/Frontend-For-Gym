import React, { Component } from 'react';
import './App.css';
import Customerlist from './Components/customerList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="header">
          <h2>
            The Cool Gym
          </h2>
        </header>
        <Customerlist />
      </div>
    );
  }
}

export default App;
