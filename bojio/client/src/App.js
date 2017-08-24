import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = { user: null }

  componentDidMount() {
    fetch('/login_status', { credentials: 'same-origin' })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'OK') {
          this.setState({ user: data.user })
        }
      });
  }

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
        { this._loginStatus() }
      </div>
    );
  }

  _loginStatus() {
    if (this.state.user) {
      return <span>Logged in as { this.state.user.displayName }</span>;
    } else {
      return <a href="http://localhost:3001/login">Login with Facebook</a>;
    }
  }
}

export default App;
