import React, { Component } from 'react';
import { Dimmer, Loader, Segment, Item } from 'semantic-ui-react';
import EventBlock from './EventBlock';
import './SingleEvent.css';

class SingleEvent extends Component {
  state = {
    isLoading: true,
    event: null
  }

  componentDidMount() {
    this.props.services
      .event
      .info(this.props.id)
      .then(event => {
        this.setState({
          isLoading: false,
          event: event
        });
      });
  }

  renderLoader() {
    return (
      <Segment className="SingleEvent-loader">
        <Dimmer active inverted>
          <Loader size="massive"/>
        </Dimmer>
      </Segment>
    );
  }

  renderEvent() {
    return (
      <Item.Group divided relaxed>
        <EventBlock services={this.props.services} {...this.state.event} showDetails={true} />
      </Item.Group>
    );
  }

  render() {
    return (
      <div className="SingleEvent">
        {this.state.isLoading ? this.renderLoader() : this.renderEvent()}
      </div>
    );
  }
}

export default SingleEvent;
