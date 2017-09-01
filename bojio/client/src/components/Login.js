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
          <h2><u>The</u> platform for all your casual outings</h2>
          <a href={this._getLoginUrl()}>
            <img src={fbButton} className="fb-login-button" alt="login-button"/>
          </a>
          <h1>Never say bojio again!</h1>
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
