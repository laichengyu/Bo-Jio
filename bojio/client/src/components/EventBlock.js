import React, { Component } from 'react';
import { Header, Segment, Item, Image, Icon } from 'semantic-ui-react';
import FacebookProvider, { Comments, CommentsCount } from 'react-facebook';
import './EventBlock.css';

class EventBlock extends Component {
  state = { showDetails: false };

  render() {
    return (
      <Item>
        <Item.Image
          label={{ as: 'a', color: 'orange', content: this.props.category.name, icon: this.props.category.icon, ribbon: true }}
          size='medium'
          src={this.props.category.defaultImage} />

        <Item.Content>
          <Item.Header as='h2'>{this.props.title}</Item.Header>
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
    return `http://localhost:3000/bojio/events/${this.props.id}`;
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
