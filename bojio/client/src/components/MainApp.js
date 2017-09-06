import React, { Component } from 'react';
import NavBar from './NavBar';
import EventList from './EventList';
import './MainApp.css';
import MyEvents from './MyEvents';
import SingleEvent from './SingleEvent';
import { BrowserRouter, Route, withRouter } from 'react-router-dom'

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
    const NavBarRoute = withRouter(props => {
      console.log(props.match.params);
      return <NavBar
        services={this.props.services}
        onEventAdd={eventId => this.setState({ latestEventId: eventId })}
        onEventFilter={this.onEventFilter}
        searchable={props.match.params.id ? false : true}
        />
      });

    return (
      <BrowserRouter>
        <div className="MainApp">
          <Route
            path="/event/:id"
            component={NavBarRoute} />
          <Route
            exact
            path="/"
            component={NavBarRoute} />
          <Route
            exact
            path="/myevents"
            component={NavBarRoute} />
          
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
                latestEventId={this.state.latestEventId} />
            }} />

          <Route
            path="/event/:id"
            render={props => {
              return <SingleEvent
                services={this.props.services}
                id={props.match.params.id}
              />
            }} />
        </div>
      </BrowserRouter>
    );
  }
}

export default MainApp;
