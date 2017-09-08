import React, { Component } from 'react';
import { Feed, Icon } from 'semantic-ui-react';
import './NotificationItem.css';
import { withRouter } from 'react-router-dom'

var moment = require('moment');

class NotificationItem extends Component {
  state = {
    objectImage: 'https://cdn0.vox-cdn.com/images/verge/default-avatar.v989902574302a6378709709f7baab789b242ebbb.gif',
    objectName: 'Your friend',
    eventName: 'an event'
  }

  component = withRouter(({ history }) => (
    <Feed.Event onClick={() => {
      history.push(`/event/${this.props.eventId}`);
      this.props.onClose();
    }}>
      <Feed.Label image={this.state.objectImage} />
      <Feed.Content>
        <Feed.Date>
          {!this.props.read
          ? <Icon name="dot circle outline" />
          : null}
          {moment(this.props.timestamp).fromNow()}
        </Feed.Date>
        <Feed.Summary>
          {this.getSummary()}
        </Feed.Summary>
        {}
      </Feed.Content>
    </Feed.Event>
  ));

  componentDidMount() {
    this.props.services
      .facebook
      .userInfo(this.props.objectUserId)
      .then(user => {
        this.setState({
          objectImage: user.pictureUrl,
          objectName: user.name
        });
      });
    this.props.services
      .event
      .info(this.props.eventId)
      .then(event => {
        this.setState({
          eventName: event.title
        });
      })
  }

  getSummary() {
    if (this.props.type === 'TAG') {
      return (
        <span>
          <a>{this.state.objectName}</a> added you to <a>{this.state.eventName}</a>
        </span>
      );
    } else if (this.props.type === 'EDIT') {
      return (
        <span>
          <a>{this.state.objectName}</a> made changes to <a>{this.state.eventName}</a>
        </span>
      );
    } else if (this.props.type === 'JOIN') {
      return (
        <span>
          <a>{this.state.objectName}</a> joined <a>{this.state.eventName}</a>
        </span>
      );
    } else if (this.props.type === 'REMINDER') {
      return (
        <span>
          <a>{this.state.eventName}</a> starts in 30 minutes!
        </span>
      );
    }
  }

  render() {
    return <this.component />;
  }
}

export default NotificationItem;
