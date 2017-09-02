import React, { Component } from 'react';
import { Header, Item } from 'semantic-ui-react';
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
        events.reverse();
        this.setState({
          isLoading: false,
          events: events
        });
      });
  }

  refresh() {
    this.props.services.event
      .list()
      .then(events => {
        events.reverse();
        this.setState({
          events: events
        });
      });
  }

  render() {
    return (
      <div className="EventList">
        <Header as='h1'>Upcoming Events</Header>

        <Item.Group divided relaxed>
        {
          this.state.events.map(
            event => <EventBlock key={`EventBlock.${event.id}`} services={this.props.services} {...event} />)
        }
        </Item.Group>
      </div>
    );
  }
}

export default EventList;
