import React, { Component } from 'react';
import NavBar from './NavBar';
import { Header, Segment, List, Image } from 'semantic-ui-react';
import placeholder from '../img/placeholder.jpg';
import FacebookProvider, { Comments } from 'react-facebook';
import './MainApp.css';

class MainApp extends Component {
  render() {
    /* Dummy events for display, items to be pulled from database */
    /* Events should be sorted by latest first */
    /* Placeholder img to be replaced with profile picture and/or category thumbnail */
    const eventsList = [
      {
        date: '25 August 2017',
        time: '14:00',
        title: 'blablablabla',
        description: 'fillingup2linesfillingup2linesfillingup2linesfillingup2linesfillingup2linesfillingup2lines',
        location: 'test-loc1',
        category: 'test-cat1',
        thumbnail: <img src={placeholder} alt='thumbnail'/>,
      },
      {
        date: '24 August 2017',
        time: '14:00',
        title: 'test-title2',
        description: 'test-desc2',
        location: 'test-loc2',
        category: 'test-cat2',
        thumbnail: <img src={placeholder} alt='thumbnail'/>,
      },
      {
        date: '23 August 2017',
        time: '14:00',
        title: 'test-title3',
        description: 'test-desc3',
        location: 'test-loc3',
        category: 'test-cat3',
        thumbnail: <img src={placeholder} alt='thumbnail'/>,
      },
      {
        date: '22 August 2017',
        time: '14:00',
        title: 'test-title4',
        description: 'test-desc4',
        location: 'test-loc4',
        category: 'test-cat4',
        thumbnail: <img src={placeholder} alt='thumbnail'/>,
      },
      {
        date: '21 August 2017',
        time: '14:00',
        title: 'test-title5',
        description: 'test-desc5',
        location: 'test-loc5',
        category: 'test-cat5',
        thumbnail: <img src={placeholder} alt='thumbnail'/>,
      },
    ];
    return (
      <div className="MainApp">
        <NavBar services={this.props.services} />
        <div className="Wrapper">
          <Header as='h2' id="intro">Check out what your friends are up to!</Header>
          <List className="Events-list">
              {eventsList.map((event, idx) => {
                return (
                  <List.Item key={idx} className="Events-list-item">
                    <Segment.Group horizontal>
                      <Segment id="thumbnails">
                        <Image size='small'>{event.thumbnail}</Image>
                        {/* Category thumbnail */}
                      </Segment>

                      <Segment id="desc">
                        <span>{event.description}</span>
                        {/* FB comments goes here */}
                      </Segment>

                      <Segment id="MainApp-Essential-Info">
                        <Segment.Group>
                          <Segment>
                            <List>
                              <List.Item>{event.date}, {event.time}</List.Item>
                              <List.Item><Header as='h1'>{event.title}</Header></List.Item>
                              <List.Item>{event.location}</List.Item>
                            </List>
                          </Segment>
                          <Segment>
                            <List.Item>{event.category}</List.Item>
                            {/* FB like button goes here */}
                          </Segment>
                        </Segment.Group>
                      </Segment>
                    </Segment.Group>
                  </List.Item>
                );
              })}
          </List>
        </div>

        <FacebookProvider appId={this.props.services.facebook.appId}>
          <Comments href="http://localhost:3000/test" />
        </FacebookProvider>
      </div>
    );
  }
}

export default MainApp;
