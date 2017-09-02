import React, { Component } from 'react';
import { Header, Item } from 'semantic-ui-react';
import EventBlock from './EventBlock';
import InfiniteScroll from 'react-infinite-scroller';
import './EventList.css';

class EventList extends Component {
  state = {
    isLoading: true,
    events: [],
    filter: {
      category: 'all',
      text: ''
    },
    pagination: 1
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

  filter = (filter) => {
    this.setState({
      filter: {
        ...this.state.filter,
        ...filter
      }
    });
  };

  getEvents() {
    var filteredEvents = this.state.events;
    if (this.state.filter.category !== 'all') {
      filteredEvents = filteredEvents.filter(event =>
        (event.category.id === this.state.filter.category)
      );
    }

    if (this.state.filter.text.length > 0) {
      filteredEvents = filteredEvents.filter(event =>
        (event.title.toLowerCase().indexOf(this.state.filter.text.toLowerCase()) !== -1)
      );
    }
    return filteredEvents;
  }

  render() {
    if (this.state.isLoading) {
      return null;
    }
    
    const events = this.getEvents();
    const maxNum = 5 * this.state.pagination;
    return (
      <div className="EventList">
        <Header as='h1'>Upcoming Events</Header>

        <InfiniteScroll
            pageStart={0}
            loadMore={() => {
              this.setState({
                pagination: this.state.pagination + 1
              });
            }}
            hasMore={events.length >= maxNum}
            loader={null}
        >
          <Item.Group divided relaxed>
          {
            events.filter((_, index) => index < maxNum)
            .map(
              event => <EventBlock key={`EventBlock.${event.id}`} services={this.props.services} {...event} />)
          }
          </Item.Group>
        </InfiniteScroll>
      </div>
    );
  }
}

export default EventList;
