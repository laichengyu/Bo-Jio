import React, { Component } from 'react';
import './CreateEventForm.css';
import { Label, Button, Header, Form } from 'semantic-ui-react';
import { SingleDatePicker } from 'react-dates';
import GiphySearch from './GiphySearch';

class CreateEventForm extends Component {
  state = {
    isFocused: false,
    date: null,
    gifSearchText: ""
  };

  gifSearchTextChange = (event) => {
    this.setState({
      gifSearchText: event.target.value
    });
  }

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

          <div className="field">
            <div className="two fields">
              <div className="field">
                <label>Date</label>
                  <SingleDatePicker
                    date={this.state.date}
                    focused={this.state.isFocused}
                    onDateChange={(newDate) => this.setState({
                      date: newDate
                    })}
                    onFocusChange={() => {
                      this.setState({
                        isFocused: !this.state.isFocused
                      });
                    }}
                    numberOfMonths= "1"
                  />
                {/*
                <div className="ui calendar" id="example2">
                  <div className="ui input left icon">
                    <i className="calendar icon"></i>
                    <input type="text" placeholder="Date">{SingleDatePicker}</input>
                  </div>
                </div>
                */}
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
            <label>Giphy</label>
            <input
              type="text"
              name="image"
              placeholder="keywords?"
              onChange={this.gifSearchTextChange}
            />
            {
              this.state.gifSearchText
                ? <GiphySearch searchText={this.state.gifSearchText} />
                : null
            }
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
