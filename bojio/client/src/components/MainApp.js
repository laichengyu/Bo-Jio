import React, { Component } from 'react';
import NavBar from './NavBar';

class MainApp extends Component {
  render() {
    return (
      <div className="MainApp">
        <NavBar services={this.props.services} />
      </div>
    );
  }
}

export default MainApp;
