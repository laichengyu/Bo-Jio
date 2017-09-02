import React, { Component } from 'react';
import { Item, Label, List, Divider } from 'semantic-ui-react';
import FacebookProvider, { Comments, CommentsCount, Like } from 'react-facebook';
import EventCreator from './EventCreator';
import Facepile from './Facepile';
import EventStatusToken from './EventStatusToken';
import './EventBlock.css';

var dateFormat = require('dateformat');

class EventBlock extends Component {
  state = {
    ...this.getEventProps(),

    showDetails: false
  };

  getEventProps() {
    const {services, ...event} = this.props;
    return event;
  }

  onUpdate = (event) => {
    this.setState({
      ...event
    });
  }

  render() {
    return (
      <Item className="EventBlock">
        <Item.Image
          size='medium'>
          <Label
            as='a'
            color='orange'
            content={this.state.category.name}
            icon={this.state.category.icon}
            ribbon
          />
          <img src={this.state.pictureUrl} alt={this.state.category.name} />

          <EventCreator services={this.props.services} id={this.state.creator.facebookId} />
          <Facepile services={this.props.services} ids={this.state.participants.map(participant => participant.facebookId)} />
        </Item.Image>

        <Item.Content>
          <Item.Header className="EventBlock-header">
            {this.state.title}
            {this._renderJoinLabel()}
          </Item.Header>
          <Item.Meta>
            <List className="EventBlock-date" divided horizontal>
                <List.Item icon='calendar' content={dateFormat(this.state.date, "ddd, d mmm yyyy")} />
                <List.Item icon='time' content={dateFormat(this.state.date, "HH:MM")} />
            </List>
            <List divided horizontal>
                <List.Item icon='marker' content={this.state.location} />
            </List>
          </Item.Meta>
          <Item.Description>
            {this.state.description}
          </Item.Description>
          <Divider />
          <Item.Extra>
            <div className="EventBlock-toolBar">
              {this._renderCommentCount()}
              <FacebookProvider appId={this.props.services.facebook.appId}>
                <Like href={this._getUrl()} layout="button_count" size="large" />
              </FacebookProvider>
            </div>
          </Item.Extra>
          {this._maybeRenderDetails()}
        </Item.Content>
      </Item>
    )
  }

  _getUrl() {
    return `http://bojio.ap-southeast-1.elasticbeanstalk.com/events/${this.state.id}`;
  }

  _renderJoinLabel() {
    const participants = this.state.participants.map(participant => participant.facebookId);
    const currentUserParticipant = participants.indexOf(this.props.services.facebook.currentUserId) !== -1;
    const currentUserOwner = this.props.services.facebook.currentUserId ===  this.state.creator.facebookId;

    return (
      <EventStatusToken
        id={this.state.id}
        isOwner={currentUserOwner}
        isParticipant={currentUserParticipant}
        services={this.props.services}
        onChange={this.onUpdate}
        />
    );
  }

  _renderCommentCount() {
    const toggle = () => this.setState({ showDetails: !this.state.showDetails });
    return !this.state.showDetails
      ? (
        <List divided horizontal>
          <List.Item className="EventBlock-commentsCount" icon='comments' onClick={toggle} content={
             <FacebookProvider appId={this.props.services.facebook.appId}>
                <CommentsCount href={this._getUrl()} />
             </FacebookProvider>
          } />
        </List>
      )
      : <span className="EventBlock-hideComments" onClick={toggle}>Hide comments</span>;
  }

  _maybeRenderDetails() {
    return this.state.showDetails
      ? (
        <FacebookProvider appId={this.props.services.facebook.appId}>
          <Comments href={this._getUrl()} width="100%" />
        </FacebookProvider>
      )
      : null;
  }
}

export default EventBlock;
