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
    joyrideOverlay: true,
    joyrideType: 'continuous',
    stepIndex: 0,
    isFirstTimeUser: this.props.isFirstTimeUser,
    steps: [
      {
        title: 'Create an Event',
        text: 'Click here to start jio-ing!',
        selector: '.NavBar-addEventIcon',
        position: 'bottom',
        type: 'click',
        isFixed: true
      },
      {
        title: 'Your Events',
        text: 'View all the events you\'ve hosted or joined here',
        selector: '.NavBar-myEventsIcon',
        position: 'bottom',
        type: 'click',
        isFixed: true
      },
      {
        title: 'Notifications',
        text: 'Check here for events your friends add you in!',
        selector: '#NavBar-menu > div.right.menu > div.icon.item',
        position: 'bottom',
        type: 'click',
        isFixed: true
      },
      {
        title: 'Search Filter',
        text: 'Select the category for events you wish to see!',
        selector: '#NavBar-search > div > div',
        position: 'right',
        type: 'click',
        isFixed: true
      },
      {
        title: 'Change Your View',
        text: 'Check out what\'s upcoming, latest events and past events',
        selector: '#root > div > div.EventList > div.EventList-headerBlock > div',
        position: 'bottom',
        type: 'click',
        isFixed: true
      },
      {
        title: 'Event Interaction',
        text: 'Click to join or leave events',
        selector: '.EventStatusToken',
        position: 'bottom',
        type: 'click',
        isFixed: true
      },
      {
        title: 'Manage Your Events',
        text: 'Here\'s where you edit events you\'ve hosted',
        selector: '#root > div > div.EventList > div:nth-child(2) > div > div:nth-child(2) > div.content > div.header.EventBlock-header > div',
        position: 'top',
        type: 'click',
        isFixed: true
      }
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
      latestEventId={this.state.latestEventId}
      isFirstTimeUser={this.state.isFirstTimeUser} />
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

  handleJoyrideCallback = (result) => {
    window.jQuery('body').addClass('body--noScroll');
    if (result.type === 'step:before') {
      // Keep internal state in sync with joyride
      this.setState({ stepIndex: result.index });
    }

    if (result.type === 'finished' && this.state.isRunning) {
      // Need to set our running state to false, so we can restart if we click start again.
      this.setState({ isRunning: false, isFirstTimeUser: false });
      window.jQuery('body').removeClass('body--noScroll');
      this.props.services.user.onboarded();
    }
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
    const {
      isReady,
      isRunning,
      joyrideOverlay,
      joyrideType,
      stepIndex,
      steps,
    } = this.state;

    return (
      <BrowserRouter>
        <div className="MainApp">
          {
            (isReady && this.state.isFirstTimeUser) ?
              <Joyride
                ref={c => (this.joyride = c)}
                steps={steps}
                debug={false}
                run={isRunning}
                callback={this.handleJoyrideCallback}
                showSkipButton={true}
                showStepsProgress={true}
                stepIndex={stepIndex}
                showOverlay={joyrideOverlay}
                showBackButton={true}
                keyboardNavigation={true}
                type={joyrideType}
                scrollToSteps={false}
                disableOverlay={true}
                autoStart={true}
                locale={{
                  back: (<span>Back</span>),
                  close: (<span>Close</span>),
                  last: (<span>Last</span>),
                  next: (<span>Next</span>),
                  skip: (<span>Skip</span>),
                }}
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
