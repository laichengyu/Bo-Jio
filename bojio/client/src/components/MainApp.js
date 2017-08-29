import React, { Component } from 'react';
import NavBar from './NavBar';
import EventList from './EventList';
import './MainApp.css';
import CreateEventForm from './CreateEventForm';

class MainApp extends Component {
  render() {
    return (
      <div className="MainApp">
        <NavBar services={this.props.services} />
        {/* <EventList services={this.props.services} /> */}
        <CreateEventForm/>
      </div>
    );
  }
}

export default MainApp;
