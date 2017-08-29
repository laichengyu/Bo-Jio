import React, { Component } from 'react';
import { Item, Icon, Label, List } from 'semantic-ui-react';
import FacebookProvider, { Comments, CommentsCount } from 'react-facebook';
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
          <Item.Header>{this.props.title}</Item.Header>
          <Item.Meta>
            <List divided horizontal>
                <List.Item icon='calendar' content={dateFormat(this.props.date, "ddd, d mmm yyyy")} />
                <List.Item icon='time' content={dateFormat(this.props.date, "HH:MM")} />
                <List.Item icon='marker' content={this.props.location}  />
            </List>
          </Item.Meta>
          <Item.Description>
            {this.props.description}
          </Item.Description>
          <Item.Extra as='a' onClick={() => this.setState({ showDetails: !this.state.showDetails })}>
            {this._renderCommentCount()}
          </Item.Extra>

          {this._maybeRenderDetails()}
        </Item.Content>
      </Item>
    )
  }

  _getUrl() {
    return `http://bojio.ap-southeast-1.elasticbeanstalk.com/events/${this.props.id}`;
  }

  _renderCommentCount() {
    return !this.state.showDetails
      ? (
        <FacebookProvider appId={this.props.services.facebook.appId}>
          <span className='EventBlock-commentsCount'>
            <CommentsCount href={this._getUrl()} /> <Icon name='comment' />
          </span>
        </FacebookProvider>
      )
      : "Hide comments";
  }

  _maybeRenderDetails() {
    return this.state.showDetails
      ? (
        <FacebookProvider appId={this.props.services.facebook.appId}>
          <Comments href={this._getUrl()} />
        </FacebookProvider>
      )
      : null;
  }
}

export default EventBlock;
