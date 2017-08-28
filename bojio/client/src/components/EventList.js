import React, { Component } from 'react';
import { Header, List } from 'semantic-ui-react';
import EventBlock from './EventBlock';
import placeholder from '../img/placeholder.jpg';
import './EventList.css';

class EventList extends Component {
  /* Dummy events for display, items to be pulled from database */
  /* Events should be sorted by latest first */
  /* Placeholder img to be replaced with profile picture and/or category thumbnail */
  eventsList = [
    {
      id: 1,
      date: '25 August 2017',
      time: '14:00',
      title: 'blablablabla',
      description: 'fillingup2linesfillingup2linesfillingup2linesfillingup2linesfillingup2linesfillingup2lines',
      location: 'test-loc1',
      category: 'test-cat1',
      thumbnail: <img src={placeholder} alt='thumbnail'/>,
    },
    {
      id: 2,
      date: '24 August 2017',
      time: '14:00',
      title: 'test-title2',
      description: 'test-desc2',
      location: 'test-loc2',
      category: 'test-cat2',
      thumbnail: <img src={placeholder} alt='thumbnail'/>,
    },
    {
      id: 3,
      date: '23 August 2017',
      time: '14:00',
      title: 'test-title3',
      description: 'test-desc3',
      location: 'test-loc3',
      category: 'test-cat3',
      thumbnail: <img src={placeholder} alt='thumbnail'/>,
    },
    {
      id: 4,
      date: '22 August 2017',
      time: '14:00',
      title: 'test-title4',
      description: 'test-desc4',
      location: 'test-loc4',
      category: 'test-cat4',
      thumbnail: <img src={placeholder} alt='thumbnail'/>,
    },
    {
      id: 5,
      date: '21 August 2017',
      time: '14:00',
      title: 'test-title5',
      description: 'test-desc5',
      location: 'test-loc5',
      category: 'test-cat5',
      thumbnail: <img src={placeholder} alt='thumbnail'/>,
    }
  ];

  render() {
    return (
      <div className="EventList">
        <Header as='h2' id="EventList-intro">Check out what your friends are up to!</Header>
        <List
          className="EventList-list"
          items={
            this.eventsList.map(
              event => <EventBlock {...event} />
            )
          }
        />
      </div>
    );
  }
}

export default EventList;
