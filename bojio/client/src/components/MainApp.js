import React, { Component } from 'react';
import NavBar from './NavBar';
import EventList from './EventList';
import './MainApp.css';
import MyEvents from './MyEvents';
import { BrowserRouter, Route } from 'react-router-dom'

class MainApp extends Component {
  state = {
    filter: {
      category: 'all',
      text: ''
    },
    latestEventId: null
  };

  onEventFilter = (filter) => {
    this.setState({
      filter: {
        ...this.state.filter,
        ...filter
      }
    });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="MainApp">
          <NavBar
            services={this.props.services}
            onEventAdd={eventId => this.setState({ latestEventId: eventId })}
            onEventFilter={this.onEventFilter}
            />
          <Route
            exact
            path="/"
            render={() => {
              return <EventList
                services={this.props.services}
                filter={this.state.filter}
                latestEventId={this.state.latestEventId} />
            }} />
          <Route
            exact
            path="/myevents"
            render={() => {
              return <MyEvents
                services={this.props.services}
                filter={this.state.filter}
                refs="eventList"
                latestEventId={this.state.latestEventId} />
            }} />
        </div>
      </BrowserRouter>
    );
  }
}

export default MainApp;
