import React, { Component } from 'react';
import logo from '../img/logo.png';
import fbButton from '../img/fb-button.png';
import './Login.css';

class Login extends Component {
  render() {
    return (
      <div className="Login">
        <div className="Login-header">
          <img src={logo} className="Login-logo" alt="logo" />
          <h2>Don't say bojio!</h2>
          <a href={this._getLoginUrl()}>
            <img src={fbButton} className="fb-login-button" alt="login-button"/>
          </a>
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
