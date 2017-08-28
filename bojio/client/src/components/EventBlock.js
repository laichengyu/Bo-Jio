import React, { Component } from 'react';
import { Header, Segment, List, Image } from 'semantic-ui-react';
import './EventBlock.css';

class EventBlock extends Component {

  render() {
    return (
      <List.Item key={this.props.id} className="EventBlock">
        <Segment.Group horizontal>
          <Segment id="EventBlock-thumbnail">
            <Image size='small'>{this.props.thumbnail}</Image>
            {/* Category thumbnail */}
          </Segment>

          <Segment id="EventBlock-description">
            <span>{this.props.description}</span>
            {/* FB comments goes here */}
          </Segment>

          <Segment id="EventBlock-info">
            <Segment.Group>
              <Segment>
                <List>
                  <List.Item>{this.props.date}, {this.props.time}</List.Item>
                  <List.Item><Header as='h1'>{this.props.title}</Header></List.Item>
                  <List.Item>{this.props.location}</List.Item>
                </List>
              </Segment>
              <Segment>
                <List.Item>{this.props.category}</List.Item>
                {/* FB like button goes here */}
              </Segment>
            </Segment.Group>
          </Segment>
        </Segment.Group>
      </List.Item>
    )
  }
}

export default EventBlock;
