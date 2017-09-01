import React, { Component } from 'react';
import { Label, Item, Icon } from 'semantic-ui-react';
import EventBlock from './EventBlock';
import './MyEvents.css';

class MyEvents extends Component {
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
      });
  }

  render() {
    return (
      <div className="MyEvents">
        <a className="ui red tag label">
          <i className="user icon"></i>
          Hosted
        </a>
        <a className="ui green tag label">
          <i className="users icon"></i>
          Joined
        </a>

        <Item.Group divided relaxed>
          {/* Needs to be changed to My Hosted/Joined Events*/}
        {
          this.state.events.map(
            event => <EventBlock key={`EventBlock.${event.id}`} services={this.props.services} {...event} />)
        }
        </Item.Group>
      </div>
    );
  }
}

export default MyEvents;
