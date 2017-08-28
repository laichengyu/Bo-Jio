import React, { Component } from 'react';
import { Item, Icon, Label } from 'semantic-ui-react';
import FacebookProvider, { Comments, CommentsCount } from 'react-facebook';
import EventCreator from './EventCreator';
import Facepile from './Facepile';
import './EventBlock.css';

class EventBlock extends Component {
  state = { showDetails: false };

  render() {
    return (
      <Item>
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
          <Item.Meta>{this.props.date}, {this.props.location}</Item.Meta>
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
