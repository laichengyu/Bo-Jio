import React, { Component } from 'react';
import { Menu, Item } from 'semantic-ui-react';
import EventBlock from './EventBlock';
import './MyEvents.css';

class MyEvents extends Component {
  state = {
    isLoading: true,
    events: [],
    activeItem: 'Hosted',
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

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
    const { activeItem } = this.state;

    return (
      <div className="MyEvents">
        <Menu pointing secondary>
          <Menu.Item name='Hosted' active={activeItem === 'Hosted'} onClick={this.handleItemClick} />
          <Menu.Item name='Joined' active={activeItem === 'Joined'} onClick={this.handleItemClick} />
        </Menu>
        {/*
        <a className="ui red tag label">
          <i className="user icon"></i>
          Hosted
        </a>
        <a className="ui green tag label">
          <i className="users icon"></i>
          Joined
        </a>
        */}

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
