import React, { Component } from 'react';
import logo from './img/logo.png';
import fbButton from './img/fb-button.png';
import Services from './services';
import './App.css';

class App extends Component {
  state = { user: null, isLoading: true, services: null }

  componentDidMount() {
    fetch('/login_status', { credentials: 'same-origin' })
      .then(res => res.json())
      .then(data => {
        this.setState({
          isLoading: false
        });

        if (data.status !== 'OK') {
          return;
        }

        const services = new Services(data.user.accessToken, data.user.id);
        services.facebook
          .userInfo()
          .then(user => {
            this.setState({
              services: services,
              user: user
            });
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
      return (
        <div>
          <img src={ this.state.user.pictureUrl } alt="fb-profile" />
          <span>Logged in as { this.state.user.name }</span>
        </div>
      );
    } else {
      return <a href="http://localhost:3001/login">
        <img src={fbButton} className="fb-login-button" alt="login-button"/>
      </a>;
    }
  }
}

export default App;
