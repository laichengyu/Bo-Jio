import React, { Component } from 'react';
import logo from './img/logo.png';
import fbButton from './img/fb-button.png';
import './App.css';

class App extends Component {
  state = { user: null, isLoading: true }

  componentDidMount() {
    fetch('/login_status', { credentials: 'same-origin' })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'OK') {
          this.setState({ user: data.user })
        }
        this.setState({
          isLoading: false
        });
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Don't say bojio!</h2>
          { this._loginStatus() }
        </div>
      </div>
    );
  }

  _loginStatus() {
    if (this.state.isLoading) {
      return null;
    }
    if (this.state.user) {
      return <span>Logged in as { this.state.user.displayName }</span>;
    } else {
      return <a href="http://localhost:3001/login">
        <img src={fbButton} className="fb-login-button" alt="login-button"/>
      </a>;
    }
  }
}

export default App;
