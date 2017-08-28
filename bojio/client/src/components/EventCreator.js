import React, { Component } from 'react';
import Avatar from './Avatar';
import { Label } from 'semantic-ui-react';
import './EventCreator.css';

class EventCreator extends Component {
  state = { creatorName: null }

  componentDidMount() {
    this.props.services
      .facebook
      .userInfo(this.props.id)
      .then(user => {
        this.setState({
          creatorName: user.firstName
        })
      });
  }

  render() {
    return (
      <div className="EventCreator">
        {
          this.state.creatorName
            ? <Label pointing='right' color="teal">{this.state.creatorName} is hosting!</Label>
            : null
        }
        <Avatar services={this.props.services} id={this.props.id} />
      </div>
    );
  }
}

export default EventCreator;
