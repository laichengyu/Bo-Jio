import React, { Component } from 'react';
import logo from '../img/logo.png';
import fbButton from '../img/fb-button.png';
import { Header } from 'semantic-ui-react';
import './Login.css';

class Login extends Component {
  render() {
    return (
      <div className="Login">
        <div className="Login-header">
          <div className="Login-sloganBlock2">
            <Header as='h1' className="Login-slogan">
              Don't say
            </Header>
            <img src={logo} className="Login-logo" alt="logo" />
          </div>
          <Header as='h1' className="Login-tagline">A platform for all your casual outings</Header>
          <div className="Login-sloganBlock">
            <a href={this._getLoginUrl()} className="Login-fbButtonAnchor">
              <img src={fbButton} className="fb-login-button" alt="login-button"/>
            </a>
          </div>
        </div>
      </div>
    );
  }

  _getLoginUrl() {
    const env = process.env.NODE_ENV || "development";
    if (env === 'production') {
      return '/api/login';
    } else {
      return 'http://localhost:8081/api/login';
    }
  }
}

export default Login;
