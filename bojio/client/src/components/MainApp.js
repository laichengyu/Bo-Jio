import React, { Component } from 'react';
import NavBar from './NavBar';
import EventList from './EventList';
import './MainApp.css';
import MyEvents from './MyEvents';

class MainApp extends Component {
  state = {
    atHomePage: true,
  }

  render() {
    return (
      <div className="MainApp">
        <NavBar services={this.props.services}
          onMyEventsOpen={() => this.setState({atHomePage: false})}
          returnToHomePage={() => this.setState({atHomePage: true})}
          onEventRefresh={() => this.refs.eventList.refresh()}
          />
        {this.state.atHomePage ? <EventList services={this.props.services} ref="eventList" />
                               : <MyEvents services={this.props.services} ref="eventList" />}
      </div>
    );
  }
}

export default MainApp;
