import React, { Component } from 'react';
import { Header, List } from 'semantic-ui-react';
import EventBlock from './EventBlock';
import './EventList.css';

class EventList extends Component {
  state = {
    isLoading: true,
    events: []
  };

  componentDidMount() {
    this.props.services.event
      .list()
      .then(events => {
        this.setState({
          isLoading: false,
          events: events
        });
        console.log(events);
      });
  }

  render() {
    return (
      <div className="EventList">
        <Header as='h2' id="EventList-intro">Check out what your friends are up to!</Header>

        <List
          className="EventList-list"
          items={
            this.state.events.map(
              event => <EventBlock {...event} />
            )
          }
        />
      </div>
    );
  }
}

export default EventList;
