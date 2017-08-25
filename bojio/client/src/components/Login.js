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
          <a href="http://localhost:8081/login">
            <img src={fbButton} className="fb-login-button" alt="login-button"/>
          </a>
        </div>
      </div>
    );
  }
}

export default Login;
