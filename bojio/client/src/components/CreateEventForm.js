import React, { Component } from 'react';
import './CreateEventForm.css';
import { Label, Button, Header, Form, Dropdown } from 'semantic-ui-react';
import { SingleDatePicker } from 'react-dates';
import InviteTokenizer from './InviteTokenizer';
import GiphySearch from './GiphySearch';

class CreateEventForm extends Component {
  state = {
    isFocused: false,
    gifSearchText: "",
    categories: [],

    date: null,
    title: null,
    location: null,
    time: null,
    imageUrl: null,
    description: null,
    inviteList: [],
    category: null
  };

  componentDidMount() {
    this.props.services.category
      .list()
      .then(categories =>
        categories.map(category => {
          return {
            key: category.id,
            icon: category.icon,
            text: category.name,
            value: category.id
          }
        }))
      .then(categories => {
        this.setState({
          categories: categories
        });
      });

    const me = this;
    window.jQuery(this.refs.date).calendar({
      monthFirst: false,
      type: 'date',
      onChange: function (date, text, mode) {
        me.setState({
          date: date.getTime() - 1000 * (date.getHours() * 3600 + date.getMinutes() * 60)
        });
      }
    });

    window.jQuery(this.refs.time).calendar({
      ampm: false,
      type: 'time',
      onChange: function (date, text, mode) {
        me.setState({
          time: date.getHours() * 3600 + date.getMinutes() * 60
        });
      }
    });
  }

  gifSearchTextChange = (event) => {
    this.setState({
      gifSearchText: event.target.value
    });
  }

  submitForm = (event) => {
    event.preventDefault();
    const timestamp = this.state.date + this.state.time * 1000;

    const data = {
      date: timestamp,
      title: this.state.title,
      category: this.state.category,
      location: this.state.location,
      imageUrl: this.state.imageUrl,
      description: this.state.description,
      inviteList: this.state.inviteList.map(e => e.value)
    };

    this.props.services.event
      .create(data)
      .then(() => {this.props.onSave()});
  }

  render() {
    return (
      <div className="CreateEventForm">
        <Header as='h2' id="CreateEventForm-intro">Jio your friends now!</Header>
        <form className="ui form">
          <div className="field">
            <label>Event Title</label>
            <input type="text" name="event-title" placeholder="Give it a short catchy name"
              onChange={(event) => this.setState({title: event.target.value})}></input>
          </div>

          <div className="field">
            <label>Category</label>
            <Dropdown placeholder='Select Category' fluid selection options={this.state.categories}
              onChange={(event, data) => {
                this.setState({category: data.value});
              }}/>
          </div>

          <div className="field">
            <label>Location</label>
            <input type="text" name="location" placeholder="Specify where it's held"
              onChange={(event) => this.setState({location: event.target.value})}></input>
          </div>

          <div className="field">
            <div className="two fields">
              <div className="field">
                <label>Date</label>
                  <div className="ui calendar" ref="date">
                    <div className="ui input left icon">
                      <i className="calendar icon"></i>
                      <input type="text" placeholder="Date" />
                    </div>
                  </div>
              </div>

              <div className="field">
                <label>Time</label>
                <div className="ui calendar" ref="time">
                  <div className="ui input left icon">
                    <i className="time icon"></i>
                    <input type="text" placeholder="Time" />
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
              this.state.gifSearchText.length > 2
                ? <GiphySearch
                    searchText={this.state.gifSearchText}
                    onImageSelect={imageUrl => this.setState({imageUrl: imageUrl})}
                    />
                : null
            }
          </div>

          <div className="field">
            <label>Description</label>
            <Form.TextArea rows="4" className="CreateEventForm-description"
              placeholder="BYOB, Girlfriends not allowed, Late-comers treating. Set your rules here!"
              onChange={(event) => this.setState({description: event.target.value})}
              >
            </Form.TextArea>
          </div>

          <div className="field">
            <label>Invite</label>
            <InviteTokenizer
              services={this.props.services}
              onInviteListChange={inviteList => this.setState({inviteList: inviteList})}/>
          </div>

          <div className="CreateEventForm-submitButton">
            <Label className="right pointing label">
              *Event will be created, and your friends will see it on their event feed!
            </Label>
            <Button className="ui primary button" onClick={this.submitForm}>Jio!</Button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateEventForm;
