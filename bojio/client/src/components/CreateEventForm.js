import React, { Component } from 'react';
import './CreateEventForm.css';
import { Label, Button, Header, Form, Dropdown, Step, Icon, Image, Divider, Modal } from 'semantic-ui-react';
import FacebookProvider, { Like } from 'react-facebook';
import giphyImage from '../img/giphy.gif';
import InviteTokenizer from './InviteTokenizer';
import GiphySearch from './GiphySearch';

class CreateEventForm extends Component {
  state = {
    isFocused: false,
    gifSearchText: "",
    categories: [],
    stage: 0,
    giphySearchOpen: false,
    giphyImage: null,

    createdEventId: null,
    date: null,
    title: null,
    location: null,
    time: null,
    imageUrl: null,
    description: null,
    inviteList: [],
    category: null,

    ...(this.props.editMode ? this.props.eventData : {})
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
            value: category.id,
            defaultImage: category.defaultImage
          }
        }))
      .then(categories => {
        this.setState({
          categories: categories
        });
      });
    if (this.props.editMode) {
      this.setupCalendar();
      const date = new Date(this.state.dateDate);
      window.jQuery(this.refs.date).calendar('set date', date);
      window.jQuery(this.refs.time).calendar('set date', date);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.editMode && this.state.stage === 1 && prevState.stage !== 1) {
      this.setupCalendar();
    }

    if (this.state.giphySearchOpen && !prevState.giphySearchOpen) {
      this.refs.giphySearchInput.focus();
    }
  }

  setupCalendar() {
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
      gifSearchText: event.target.value,
      giphyImage: null
    });
  }

  submitForm = (event) => {
    const timestamp = this.state.date + this.state.time * 1000;

    const data = {
      date: timestamp,
      title: this.state.title,
      category: this.state.category,
      location: this.state.location,
      pictureUrl: this.state.imageUrl,
      description: this.state.description
    };

    const eventCall = this.props.editMode
      ? this.props.services.event.edit(this.state.createdEventId, data)
      : this.props.services.event.create(data)

    return eventCall
      .then(event => {
        if (!this.props.editMode) {
          this.setState({ createdEventId: event.id });
        }
        return event;
      });
  }

  canNext() {
    if (this.props.editMode) {
      return this.state.category && this.state.title && this.state.category && this.state.location && this.state.date && this.state.time;
    }
    if (this.state.stage === 0) {
      return this.state.category !== null;
    } else if (this.state.stage === 1) {
      return this.state.title && this.state.category && this.state.location && this.state.date && this.state.time;
    } else {
      return true;
    }
  }

  renderCategorySelect() {
    return (
      <form className="ui form">
        <div className="field required">
          <Dropdown placeholder='Select Category' fluid selection options={this.state.categories.map(category => {var c = {...category}; delete c.defaultImage; return c;})}
            value={this.state.category}
            onChange={(event, data) => {
              this.setState({
                category: data.value
              });
            }}/>
        </div>
      </form>
    );
  }

  renderEssentials() {
    return (
      <form className="ui form">
        <Image title="Change Picture" className="CreateEventForm-image" src={this.state.imageUrl} height="150" centered shape='rounded' onClick={() => this.setState({giphySearchOpen: true, giphyImage: null, gifSearchText: this.state.category})}/>
        <Divider hidden />
        <div className="field required">
          <label>Event Title</label>
          <input type="text" name="event-title" placeholder="Give it a short catchy name"
            value={this.state.title}
            onChange={(event) => this.setState({title: event.target.value})}></input>
        </div>

        <div className="field">
          <div className="two fields">
            <div className="field required">
              <label>Date</label>
                <div className="ui calendar" ref="date">
                  <div className="ui input left icon">
                    <i className="calendar icon"></i>
                    <input type="text" placeholder="Date" readOnly />
                  </div>
                </div>
            </div>

            <div className="field required">
              <label>Time</label>
              <div className="ui calendar" ref="time">
                <div className="ui input left icon">
                  <i className="time icon"></i>
                  <input type="text" placeholder="Time" readOnly />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="field required">
          <label>Location</label>
          <input type="text" name="location" placeholder="Specify where it's held"
            value={this.state.location}
            onChange={(event) => this.setState({location: event.target.value})}></input>
        </div>

        <div className="field">
          <label>Description</label>
          <Form.TextArea rows="3" className="CreateEventForm-description"
            value={this.state.description}
            placeholder="BYOB, Girlfriends not allowed, Late-comers treating. Set your rules here!"
            onChange={(event) => this.setState({description: event.target.value})}
            >
          </Form.TextArea>
        </div>
      </form>
    );
  }

  renderEditMode() {
    return (
      <form className="ui form">
        <Image title="Change Picture" className="CreateEventForm-image" src={this.state.imageUrl} height="150" centered shape='rounded' onClick={() => this.setState({giphySearchOpen: true, giphyImage: null, gifSearchText: this.state.category})}/>
        <Divider hidden />

        <div className="field required">
          <label>Category</label>
          <Dropdown placeholder='Select' fluid selection options={this.state.categories.map(category => {var c = {...category}; delete c.defaultImage; return c;})}
            value={this.state.category}
            onChange={(event, data) => {
              this.setState({
                category: data.value
              });
            }}/>
        </div>

        <div className="field required">
          <label>Event Title</label>
          <input type="text" name="event-title" placeholder="Give it a short catchy name"
            value={this.state.title}
            onChange={(event) => this.setState({title: event.target.value})}></input>
        </div>

        <div className="field">
          <div className="two fields">
            <div className="field required">
              <label>Date</label>
                <div className="ui calendar" ref="date">
                  <div className="ui input left icon">
                    <i className="calendar icon"></i>
                    <input type="text" placeholder="Date" readOnly />
                  </div>
                </div>
            </div>

            <div className="field required">
              <label>Time</label>
              <div className="ui calendar" ref="time">
                <div className="ui input left icon">
                  <i className="time icon"></i>
                  <input type="text" placeholder="Time" readOnly />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="field required">
          <label>Location</label>
          <input type="text" name="location" placeholder="Specify where it's held"
            value={this.state.location}
            onChange={(event) => this.setState({location: event.target.value})}></input>
        </div>

        <div className="field">
          <label>Description</label>
          <Form.TextArea rows="3" className="CreateEventForm-description"
            value={this.state.description}
            placeholder="BYOB, Girlfriends not allowed, Late-comers treating. Set your rules here!"
            onChange={(event) => this.setState({description: event.target.value})}
            >
          </Form.TextArea>
        </div>
      </form>
    );
  }

  _getUrl() {
    return `http://bojio.ap-southeast-1.elasticbeanstalk.com/events/${this.state.createdEventId}`;
  }

  renderComplete() {
    return (
      <div>
        <Header as='h2' icon textAlign='center'>
          <Icon name='check circle' className='green' />
          <Header.Content>
            Event Created
          </Header.Content>
        </Header>


        {this.state.createdEventId
          ? (
            <div className="CreateEventForm-share">
              <FacebookProvider appId={this.props.services.facebook.appId}>
                <Like href={this._getUrl()} layout="button_count" size="large" share />
              </FacebookProvider>
            </div>
          )
          : null}
        
        <div className="CreateEventForm-invite">
          <Header as='h4'>Invite your friends to the event!</Header>
          <InviteTokenizer
            services={this.props.services}
            onInviteListChange={inviteList => this.setState({inviteList: inviteList})}/>
        </div>
      </div>
    )
  }

  nextStage = () => {
    this.setState({
      stage: this.state.stage + 1
    });

    if (this.state.stage === 0) {
      if (!this.props.editMode) {
        this.setState({
          imageUrl: this.state.categories.filter(category => this.state.category === category.value)[0].defaultImage
        });
      } else {
        this.submitForm().then(event => {
            this.props.onEventChange(event);
            this.props.onSave();
          });
      }
    }
    if (this.state.stage === 1) {
      this.submitForm();
    }
    if (this.state.stage === 2) {
      if (this.state.inviteList.length > 0) {
        this.props.services.event.setParticipants(this.state.createdEventId, this.state.inviteList.map(e => e.value))
          .then(() => {
            this.props.onEventRefresh();
            this.props.onSave();
          });
      } else {
        this.props.onEventRefresh();
        this.props.onSave();
      }
    }
  };

  giphyField() {
    return (
      <div className="CreateEventForm-giphyFormBlock">
        <Header as='h2'>Giphy Search</Header>
        <form className="ui form CreateEventForm-giphyForm">
          <div className="CreateEventForm-giphyBlock">
            <input
              ref="giphySearchInput"
              type="text"
              name="image"
              placeholder="Keywords?"
              onChange={this.gifSearchTextChange}
            />
            <Image src={giphyImage} />
          </div>
          {
            this.state.gifSearchText.length > 2
              ? <GiphySearch
                  searchText={this.state.gifSearchText}
                  onImageSelect={imageUrl => this.setState({giphyImage: imageUrl})}
                  />
              : null
          }
          <div className="CreateEventForm-giphyButtons">
            <Button
            floated="right"
              className="ui primary button"
              onClick={() => {
                this.setState({
                  imageUrl: this.state.giphyImage,
                  gifSearchText: "",
                  giphySearchOpen: false
                });
              }}
              disabled={this.state.giphyImage === null}
            >Save</Button>
            <Button
            floated="right"
              className="ui red button"
              onClick={() => {
                this.setState({
                  giphySearchOpen: false,
                  gifSearchText: "",
                });
              }}
              >Cancel</Button>
            </div>
        </form>
      </div>
    );
  }

  renderGiphyModal() {
    return (
      <Modal
        size="tiny"
        open={this.state.giphySearchOpen}
        >
        <Modal.Content>
          {this.giphyField()}
        </Modal.Content>
      </Modal>
    );
  }

  buttonText() {
    if (this.state.stage === 2) {
      if (this.state.inviteList.length > 0) {
        return 'Send Invitation!';
      } else {
        return 'Done!';
      }
    } else if (!this.props.editMode) {
      return 'Next';
    } else {
      return 'Done!';
    }
  }

  render() {
    return (
      <div className="CreateEventForm">
        {!this.props.editMode
          ? (
              <Header as='h2' id="CreateEventForm-intro">Create an Event</Header>
            )
          : (
              <Header as='h2' id="CreateEventForm-intro">Manage Event</Header>
            )}
        {!this.props.editMode
          ? (
              <Step.Group className="CreateEventForm-step">
                <Step active={this.state.stage === 0} disabled={this.state.stage < 0} icon='sitemap' title='Categorize' description='Select a category'/>

                <Step active={this.state.stage === 1} disabled={this.state.stage < 1} icon='wordpress forms' title='Details' description='Fill in basic information' />

                <Step active={this.state.stage === 2} disabled={this.state.stage < 2} icon='share' title='Share' description='Share and invite friends'/>
              </Step.Group>
            )
          : null}
        

        {(!this.props.editMode && this.state.stage === 0) ? this.renderCategorySelect() : null}
        {(!this.props.editMode && this.state.stage === 1) ? this.renderEssentials() : null}
        {(!this.props.editMode && this.state.stage === 2) ? this.renderComplete() : null}
        {this.props.editMode ? this.renderEditMode() : null}
          
        {this.renderGiphyModal()}

        {/*
        

        <div className="field">
          <label>Invite</label>
          <InviteTokenizer
            services={this.props.services}
            onInviteListChange={inviteList => this.setState({inviteList: inviteList})}/>
        </div>*/}

        <div className="CreateEventForm-buttons">
          {
            this.state.stage < 2
              ? <Button className="ui red button" onClick={this.props.onSave}>Cancel</Button>
              : null
          }          
          <Button className="ui primary button" onClick={this.nextStage} disabled={!this.canNext()}>{this.buttonText()}</Button>
          
        </div>
      </div>
    );
  }
}

export default CreateEventForm;
