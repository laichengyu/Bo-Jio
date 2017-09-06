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

  NavBarRoute = withRouter(props => {
    return <NavBar
      services={this.props.services}
      onEventAdd={this.onEventAdd}
      onEventFilter={this.onEventFilter}
      searchable={props.location.pathname.startsWith('/event') ? false : true}
      />
  });

  EventListRouter = withRouter(props => (
    <EventList
      services={this.props.services}
      filter={this.state.filter}
      latestEventId={this.state.latestEventId} />
  ));

  MyEventsRouter = withRouter(props => (
    <MyEvents
      services={this.props.services}
      filter={this.state.filter}
      latestEventId={this.state.latestEventId} />
  ));

  onEventFilter = (filter) => {
    this.setState({
      filter: {
        ...this.state.filter,
        ...filter
      }
    });
  };

  onEventAdd = (eventId) => {
    this.setState({ latestEventId: eventId });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="MainApp">
          <Route key="Route"
            path="/"
            component={this.NavBarRoute} />
          
          <Route
            exact
            path="/"
            component={this.EventListRouter} />

          <Route
            exact
            path="/myevents"
            component={this.MyEventsRouter} />

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
