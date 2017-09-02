import React, { Component } from 'react';
import { Label, Icon } from 'semantic-ui-react';
import './EventStatusToken.css';

class EventStatusToken extends Component {
  state = {
    currentStatus:
      this.props.isOwner
        ? 'edit'
        : (
          this.props.isParticipant
            ? 'joined'
            : 'join'
        ),
    onHover: false
  }

  status = {
    joined: {
      color: 'green',
      icon: 'checkmark',
      text: 'Joined'
    },
    join: {
      color: 'orange',
      icon: 'calendar plus',
      text: 'Join'
    },
    edit: {
      color: 'teal',
      icon: 'edit',
      text: 'Manage'
    },
    leave: {
      color: 'red',
      icon: 'cancel',
      text: 'Leave'
    }
  }

  onMouseEnter = () => {
    if (this.state.currentStatus === 'joined') {
      this.setState({
        currentStatus: 'leave',
        onHover: true
      });
    }
  }

  onMouseOut = () => {
    if (this.state.currentStatus === 'leave' && this.state.onHover) {
      this.setState({
        currentStatus: 'joined',
        onHover: false
      });
    }
  }

  onClick = () => {
    if (this.state.currentStatus === 'join') {
      this.props.services.event.join(this.props.id)
        .then(data => data.event)
        .then(this.props.onChange);
      this.setState({
        currentStatus: 'joined'
      });
    } else if (this.state.currentStatus === 'leave') {
      this.props.services.event.leave(this.props.id)
        .then(data => data.event)
        .then(this.props.onChange);
      this.setState({
        currentStatus: 'join'
      });
    } else if (this.state.currentStatus === 'edit') {
      // TODO
    }
  }

  render() {
    const config = this.status[this.state.currentStatus];
    return (
      <Label
        className="EventStatusToken"
        color={config.color}
        size="medium"
        onClick={this.onClick}
        onMouseEnter={this.onMouseEnter}
        onMouseOut={this.onMouseOut}>
        <Icon name={config.icon} /> {config.text}
      </Label>
    );
  }
}

export default EventStatusToken;
