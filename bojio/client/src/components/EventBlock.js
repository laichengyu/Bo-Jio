import React, { Component } from 'react';
import { Item, Label, List, Divider, Header, Icon } from 'semantic-ui-react';
import FacebookProvider, { Comments, CommentsCount, Like } from 'react-facebook';
import EventCreator from './EventCreator';
import Facepile from './Facepile';
import Participant from './Participant';
import EventStatusToken from './EventStatusToken';
import './EventBlock.css';

var dateFormat = require('dateformat');

class EventBlock extends Component {
  state = {
    ...this.getEventProps(),

    showDetails: (this.props.showDetails === undefined) ? false : this.props.showDetails,
    deleted: false
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
    if (this.state.deleted) {
      return null;
    }
    return (
      <Item className="EventBlock">
        <Item.Image
          id="EventBlock-imageBlock"
          size='medium'>
          <Label
            as='a'
            color='orange'
            content={this.state.category.name}
            icon={this.state.category.icon}
            ribbon
          />
          <img id="EventBlock-image" src={this.state.pictureUrl} alt={this.state.category.name} />

          {this.state.showDetails ? this._renderFullParticipants() : this._renderParticipants()}
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
                <span className="EventBlock-toggler" onClick={() => this.setState({ showDetails: !this.state.showDetails })}>
                  {!this.props.showDetails
                      ? (!this.state.showDetails ? "Click for more details" : "Hide details")
                      : null}
                  {!this.props.showDetails
                      ? <Icon className="EventBlock-detailsIcon" name={this.state.showDetails ? "chevron up" : "chevron down"} />
                      : null}
                </span>
              <FacebookProvider appId={this.props.services.facebook.appId}>
                <Like href={this._getUrl()} layout="button_count" size="large" share />
              </FacebookProvider>
            </div>
          </Item.Extra>
          {this._maybeRenderDetails()}
        </Item.Content>
      </Item>
    )
  }

  _renderFullParticipants() {
    const header = `Participants (${this.state.participants.length})`
    return (
      <div className="EventBlock-fullParticipants">
        <div className="EventBlock-participantList">
          <Header sub content={header} />
          <List className="EventBlock-participantListOnly" verticalAlign='middle'>
            {this.state.participants.map(
              participant => <Participant key={`Participant.${participant.facebookId}`} id={participant.facebookId} services={this.props.services} />)}
          </List>
        </div>
        <EventCreator services={this.props.services} id={this.state.creator.facebookId} />
      </div>
    );
  }

  _renderParticipants() {
    return (
      <div className="EventBlock-participants">
        <Facepile
          eventId={this.props.id}
          services={this.props.services}
          ids={this.state.participants.map(participant => participant.facebookId)}
          onChange={this.onUpdate}/>
        <EventCreator services={this.props.services} id={this.state.creator.facebookId} />
      </div>
    );
  }

  _getUrl() {
    return `https://bojio.pw/event/${this.state.id}`;
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
        onDelete={() => this.setState({deleted: true})}
        data={{
          createdEventId: this.state.id,
          title: this.state.title,
          location: this.state.location,
          dateDate: this.state.date,
          description: this.state.description,
          category: this.state.category.id,
          imageUrl: this.state.pictureUrl
        }}
        />
    );
  }

  _renderCommentCount() {
    const toggle = () => this.setState({ showDetails: !this.state.showDetails });
    return (
        <span className={"EventBlock-commentsCount" + (this.state.showDetails ? " EventBlock-commentsCount--hidden" : "")} onClick={toggle}>
          <Icon name="facebook official" />
          {
            !this.state.showDetails
              ? <FacebookProvider appId={this.props.services.facebook.appId}>
                  <CommentsCount href={this._getUrl()} />
               </FacebookProvider>
              : null
          }
          {" "}
            comments
        </span>
    );
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
