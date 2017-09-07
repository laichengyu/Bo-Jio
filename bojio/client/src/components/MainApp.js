import React, { Component } from 'react';
import NavBar from './NavBar';
import EventList from './EventList';
import './MainApp.css';
import MyEvents from './MyEvents';
import SingleEvent from './SingleEvent';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import Joyride from 'react-joyride';

class MainApp extends Component {
  state = {
    filter: {
      category: 'all',
      text: ''
    },
    latestEventId: null,
    isReady: false,
    isRunning: false,
    steps: [
      {
        title: 'Trigger Action',
        text: 'It can be `click` (default) or `hover` <i>(reverts to click on touch devices</i>.',
        selector: '.NavBar-addEventIcon',
        position: 'left',
        type: 'click',
      },
    ]
  };

  NavBarRoute = withRouter(props => {
    return <NavBar
      services={this.props.services}
      onEventAdd={this.onEventAdd}
      onEventFilter={this.onEventFilter}
      searchable={props.location.pathname.startsWith('/event') ? false : true}
      joyride={this.joyride}
      />
  });

  EventListRouter = withRouter(props => {
    this.props.services.ga.pageview(props.location.pathname);
    return <EventList
      services={this.props.services}
      filter={this.state.filter}
      latestEventId={this.state.latestEventId} />
  });

  MyEventsRouter = withRouter(props => {
    this.props.services.ga.pageview(props.location.pathname);
    return <MyEvents
      services={this.props.services}
      filter={this.state.filter}
      latestEventId={this.state.latestEventId} />
  });

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isReady: true,
        isRunning: true,
      });
    }, 1000);
  }

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
    const { steps, isReady, isRunning } = this.state;

    return (
      <BrowserRouter>
        <div className="MainApp">
          {
            isReady ?
              <Joyride
                ref="joyride"
                steps={steps}
                debug={true}
                run={isRunning}
                callback={this.callback}
                />
              : null
          }
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
              this.props.services.ga.pageview(props.location.pathname);
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
