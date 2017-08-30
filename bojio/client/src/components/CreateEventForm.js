import React, { Component } from 'react';
import './CreateEventForm.css';
import { Label, Button, Header, Form } from 'semantic-ui-react';

class CreateEventForm extends Component {
  render() {
    return (
      <div className="CreateEventForm">
        <Header as='h2' id="CreateEventForm-intro">Jio your friends now!</Header>
        <form className="ui form">
          <div className="field">
            <label>Event Title</label>
            <input type="text" name="event-title" placeholder="Give it a short catchy name"></input>
          </div>

          <div className="field">
            <label>Location</label>
            <input type="text" name="location" placeholder="Specify where it's held"></input>
          </div>

          {/* Calendar and time script currently not working */}
          <div className="field">
            <div className="two fields">
              <div className="field">
                <label>Date</label>
                <div className="ui calendar" id="example2">
                  <div className="ui input left icon">
                    <i className="calendar icon"></i>
                    <input type="text" placeholder="Date"></input>
                  </div>
                </div>
              </div>

              <div className="six wide field">
                <label>Time</label>
                <div className="ui calendar" id="example3">
                  <div className="ui input left icon">
                    <i className="time icon"></i>
                    <input type="time" name="time"></input>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="field">
            <label>Image/GIF</label>
            <input type="text" name="image" placeholder="Add GIF/Image"></input>
          </div>

          <div className="field">
            <label>Description</label>
            <Form.TextArea rows="4" className="CreateEventForm-description"
              placeholder="BYOB, Girlfriends not allowed, Late-comers treating. Set your rules here!">
            </Form.TextArea>
          </div>

          <div className="CreateEventForm-submitButton">
            <Label className="right pointing label">
              *Event will be created, and your friends will see it on their event feed!
            </Label>
            <Button  className="ui primary button" type="submit">Jio!</Button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateEventForm;
