import React, { Component } from 'react';
import Avatar from './Avatar';
import './EventCreator.css';

class EventCreator extends Component {
  state = { creatorName: null }
  mounted = true

  componentDidMount() {
    this.props.services
      .facebook
      .userInfo(this.props.id)
      .then(user => {
        if (this.mounted) {
          this.setState({
            creatorName: user.firstName
          });
        }
      });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <span className="EventCreator">
        <div className="ui horizontal list">
          <div className="item EventCreator-block">
            <span className="content EventCreator-text">
              <div className="ui sub header">Hosted by</div>
              {this.state.creatorName}
            </span>
            <Avatar services={this.props.services} id={this.props.id} width="35px"/>
          </div>
        </div>
      </span>
    );
  }
}

export default EventCreator;
