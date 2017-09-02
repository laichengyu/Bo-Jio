import React, { Component } from 'react';
import { Menu, Item, Header } from 'semantic-ui-react';
import EventBlock from './EventBlock';
import './MyEvents.css';

class MyEvents extends Component {
  state = {
    isLoading: true,
    events: [],
    activeItem: 'Hosted',
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  getEventList() {
    if (this.state.activeItem === 'Hosted') {
      return this.props.services.event.created();
    } else {
      return this.props.services.event.joined();
    }
  }

  componentDidMount() {
    this.getEventList()
      .then(events => {
        events.reverse();
        this.setState({
          isLoading: false,
          events: events
        });
      });
  }

  refresh() {
    this.getEventList()
      .then(events => {
        events.reverse();
        this.setState({
          events: events
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeItem !== this.state.activeItem) {
      this.refresh();
    }
  }

  render() {
    const { activeItem } = this.state;

    return (
      <div className="MyEvents">
        <Menu pointing secondary className="MyEvents-tabs">
          <Header as='h1' className="MyEvents-header">My Events</Header>

          <Menu.Item name='Hosted' active={activeItem === 'Hosted'} onClick={this.handleItemClick} >
            <i className="user icon"></i>
            Hosted
          </Menu.Item>
          <Menu.Item name='Joined' active={activeItem === 'Joined'} onClick={this.handleItemClick} >
            <i className="users icon"></i>
            Joined
          </Menu.Item>
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
