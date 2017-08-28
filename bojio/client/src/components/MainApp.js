import React, { Component } from 'react';
import NavBar from './NavBar';
import EventList from './EventList';
import FacebookProvider, { Comments } from 'react-facebook';
import './MainApp.css';

class MainApp extends Component {
  render() {
    return (
      <div className="MainApp">
        <NavBar services={this.props.services} />
        <EventList services={this.props.services} />
        
        <FacebookProvider appId={this.props.services.facebook.appId}>
          <Comments href="http://localhost:3000/test" />
        </FacebookProvider>
      </div>
    );
  }
}

export default MainApp;
