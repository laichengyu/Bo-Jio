import React, { Component } from 'react';
import { Item, Icon, Label, List, Button, Divider } from 'semantic-ui-react';
import FacebookProvider, { Comments, CommentsCount, Like } from 'react-facebook';
import EventCreator from './EventCreator';
import Facepile from './Facepile';
import './EventBlock.css';

var dateFormat = require('dateformat');

class EventBlock extends Component {
  state = { showDetails: false };

  render() {
    return (
      <Item className="EventBlock">
        <Item.Image
          size='medium'>
          <Label
            as='a'
            color='orange'
            content={this.props.category.name}
            icon={this.props.category.icon}
            ribbon
          />
          <img src={this.props.category.defaultImage} alt={this.props.category.name} />

          <EventCreator services={this.props.services} id={this.props.creator.facebookId} />
          <Facepile services={this.props.services} ids={[this.props.creator.facebookId,this.props.creator.facebookId,this.props.creator.facebookId, this.props.creator.facebookId, this.props.creator.facebookId]} />
        </Item.Image>

        <Item.Content>
          <Item.Header className="EventBlock-header">
            {this.props.title}
            {this._renderJoinLabel()}
          </Item.Header>
          <Item.Meta>
            <List className="EventBlock-date" divided horizontal>
                <List.Item icon='calendar' content={dateFormat(this.props.date, "ddd, d mmm yyyy")} />
                <List.Item icon='time' content={dateFormat(this.props.date, "HH:MM")} />
            </List>
            <List divided horizontal>
                <List.Item icon='marker' content={this.props.location} />
            </List>
          </Item.Meta>
          <Item.Description>
            {this.props.description}
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
    return `http://bojio.ap-southeast-1.elasticbeanstalk.com/events/${this.props.id}`;
  }

  _renderJoinLabel() {
    return (
      <Label className="EventBlock-joinLabel" color="green" size="tiny">
        <Icon name='checkmark' /> Joined
      </Label>
    );
  }

  _renderCommentCount() {
    const toggle = () => this.setState({ showDetails: !this.state.showDetails });
    return !this.state.showDetails
      ? (
        <FacebookProvider appId={this.props.services.facebook.appId}>
          <span
            className='EventBlock-commentsCount'
            onClick={toggle}>
            <CommentsCount href={this._getUrl()} /> <Icon name='comment' />
          </span>
        </FacebookProvider>
      )
      : <span onClick={toggle}>Hide comments</span>;
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
