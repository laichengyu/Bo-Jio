import React, { Component } from 'react';
import { Menu, Item, Header, Image, Dropdown, Segment, Dimmer, Loader } from 'semantic-ui-react';
import EventBlock from './EventBlock';
import './MyEvents.css';

class MyEvents extends Component {
  state = {
    isLoading: true,
    events: [],
    activeItem: 'Hosted',
    displayMode: 'upcoming'
  };

  displayOptions = [
    {
      key: 'upcoming',
      text: 'Upcoming Events',
      value: 'upcoming',
      content: 'Upcoming Events'
    },
    {
      key: 'recent',
      text: 'Recent Events',
      value: 'recent',
      content: 'Recent Events',
    },
    {
      key: 'past',
      text: 'Past Events',
      value: 'past',
      content: 'Past Events',
    },
  ]

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name, isLoading: true });
  };

  getEventList() {
    if (this.state.activeItem === 'Hosted') {
      return this.props.services.event.created(this.state.displayMode);
    } else {
      return this.props.services.event.joined(this.state.displayMode);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.latestEventId !== nextProps.latestEventId) {
      this.refresh();
    }
  }

  componentDidMount() {
    this.getEventList()
      .then(events => {
        this.setState({
          isLoading: false,
          events: events
        });
      });
  }

  refresh() {
    this.getEventList()
      .then(events => {
        this.setState({
          isLoading: false,
          events: events
        });
      });
  }

  onDisplayChange = (event, data) => {
    if (this.state.displayMode !== data.value) {
      this.setState({
        isLoading: true,
        displayMode: data.value
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.displayMode !== this.state.displayMode
        || prevState.activeItem !== this.state.activeItem) {
      this.refresh();
    }
  }

  getEvents() {
    var filteredEvents = this.state.events;
    if (this.props.filter.category !== 'all') {
      filteredEvents = filteredEvents.filter(event =>
        (event.category.id === this.props.filter.category)
      );
    }

    if (this.props.filter.text.length > 0) {
      filteredEvents = filteredEvents.filter(event =>
        (event.title.toLowerCase().indexOf(this.props.filter.text.toLowerCase()) !== -1)
      );
    }
    return filteredEvents;
  }

  renderLoader() {
    return (
      <Segment className="MyEvents-loader">
        <Dimmer active inverted>
          <Loader size="massive"/>
        </Dimmer>
      </Segment>
    );
  }

  renderContent() {
    if (this.state.events.length === 0) {
      return <Image
        src="https://media.giphy.com/media/VvNblYZGFj2Ny/giphy.gif"
        size="huge"
        centered
        />
    } else {
      return (
        <Item.Group divided relaxed>
        {
          this.getEvents().map(
            event => <EventBlock key={`MyEvents.${event.id}`} services={this.props.services} {...event} />)
        }
        </Item.Group>
      );
    }
  }

  render() {
    const { activeItem } = this.state;

    return (
      <div className="MyEvents">
        <div className="MyEvents-headerBlock">
          <Header as='h1' className="MyEvents-header">
            My Events
          </Header>
            <Dropdown
              inline
              options={this.displayOptions}
              value={this.state.displayMode}
              onChange={this.onDisplayChange} />
        </div>

        <Menu pointing secondary className="MyEvents-tabs">
          <Menu.Item name='Hosted' active={activeItem === 'Hosted'} onClick={this.handleItemClick} >
            <i className="user icon"></i>
            Hosted
          </Menu.Item>
          <Menu.Item name='Joined' active={activeItem === 'Joined'} onClick={this.handleItemClick} >
            <i className="users icon"></i>
            Joined
          </Menu.Item>
        </Menu>

        {this.state.isLoading ? this.renderLoader() : this.renderContent()}
      </div>
    );
  }
}

export default MyEvents;
