import React, { Component } from 'react';
import NavBar from './NavBar';
import EventList from './EventList';
import './MainApp.css';

class MainApp extends Component {
  render() {
    return (
      <div className="MainApp">
        <NavBar services={this.props.services} />
        <EventList services={this.props.services} />
      </div>
    );
  }
}

export default MainApp;
