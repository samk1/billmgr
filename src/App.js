import React, { Component } from 'react';
import { GoogleApiLoader } from './gmail/Components';
import { GoogleSigninStatusStore } from './gmail/Stores';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <GoogleApiLoader clientId="481284105426-5scltvefbt5k7mk2q858tisun5dl3j55.apps.googleusercontent.com"/>

      </div>
    );
  }
}

export default App;
