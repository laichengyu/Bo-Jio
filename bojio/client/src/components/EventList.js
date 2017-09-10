import React, { Component } from 'react';
import { Header, Item, Dropdown, Loader, Dimmer, Segment } from 'semantic-ui-react';
import EventBlock from './EventBlock';
import InfiniteScroll from 'react-infinite-scroller';
import './EventList.css';

class EventList extends Component {
  state = {
    isLoading: true,
    events: [],
    displayMode: 'upcoming',
    pagination: 1
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
      text: 'Recently Created',
      value: 'recent',
      content: 'Recently Created',
    },
    {
      key: 'past',
      text: 'Past Events',
      value: 'past',
      content: 'Past Events',
    },
  ]

  componentDidMount() {
    this.props.services.event
      .list(this.state.displayMode)
      .then(events => {
        this.setState({
          isLoading: false,
          events: events
        });
      });
  }

  refresh() {
    this.props.services.event
      .list(this.state.displayMode)
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

  componentWillReceiveProps(nextProps) {
    if (this.props.latestEventId !== nextProps.latestEventId) {
      this.refresh();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.displayMode !== this.state.displayMode) {
      this.refresh();
    }
  }

  getEvents() {
    const dummyEventList = [{
      id: "dummy1",
      title: "Welcome to BoJio",
      description: "Enjoy your time here!",
      date: new Date(),
      location: "National University of Singapore",
      pictureUrl: "https://media.giphy.com/media/l4JyOCNEfXvVYEqB2/giphy.gif",
      createdAt: new Date(),
      category: {
        id: "party",
        name: "Party",
        defaultImage: "https://media.giphy.com/media/l4JyOCNEfXvVYEqB2/giphy.gif",
        icon: "cocktail",
      },
      creator: {
        facebookId: "1852623078088890",
        isFirstTimeUser: true,
      },
      participants: [{
        facebookId: this.props.services.facebook.currentUserId,
      }],
    },
    {
      id: "dummy2",
      title: "Example of your own event",
      description: "All your event information in one place",
      date: new Date(),
      location: "National University of Singapore",
      pictureUrl: "https://media.giphy.com/media/3o6ZtpxSZbQRRnwCKQ/giphy.gif",
      createdAt: new Date(),
      category: {
        id: "others",
        name: "Others",
        defaultImage: "https://media.giphy.com/media/3o6ZtpxSZbQRRnwCKQ/giphy.gif",
        icon: "empty star",
      },
      creator: {
        facebookId: this.props.services.facebook.currentUserId,
        isFirstTimeUser: true,
      },
      participants: [],
    }];
    var filteredEvents = this.state.events;
    if (this.props.isFirstTimeUser) {
      return dummyEventList;
    }
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
      <Segment className="EventList-loader">
        <Dimmer active inverted>
          <Loader size="massive"/>
        </Dimmer>
      </Segment>
    );
  }

  renderEvents() {
    const events = this.getEvents();
    const maxNum = 5 * this.state.pagination;

    return (
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
          events.length === 0 ? <Header as='h3' className="EventList-noResultsFound">No events found...</Header>
          :
            events.filter((_, index) => index < maxNum)
            .map(
              event => <EventBlock key={`EventBlock.${event.id}`} services={this.props.services} {...event} />)
        }
        </Item.Group>
      </InfiniteScroll>
    );
  }

  render() {
    return (
      <div className="EventList">
        <div className="EventList-headerBlock">
          <Header as='h1' className="EventList-header">
            Events Feed
          </Header>
              <Dropdown
                inline
                options={this.displayOptions}
                value={this.state.displayMode}
                onChange={this.onDisplayChange} />
        </div>

        {this.state.isLoading ? this.renderLoader() : this.renderEvents()}
      </div>
    );
  }
}

export default EventList;
