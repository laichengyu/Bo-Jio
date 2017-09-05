import React, { Component } from 'react';
import { Label, Icon, Modal } from 'semantic-ui-react';
import CreateEventForm from './CreateEventForm';
import './EventStatusToken.css';

class EventStatusToken extends Component {
  state = {
    currentStatus:
      this.props.isOwner
        ? 'edit'
        : (
          this.props.isParticipant
            ? 'joined'
            : 'join'
        ),
    onHover: false,
    editEventFormOpen: false
  }

  status = {
    joined: {
      color: 'green',
      icon: 'checkmark',
      text: 'Joined'
    },
    join: {
      color: 'orange',
      icon: 'calendar plus',
      text: 'Join'
    },
    edit: {
      color: 'yellow',
      icon: 'edit',
      text: 'Manage'
    },
    leave: {
      color: 'red',
      icon: 'cancel',
      text: 'Leave'
    }
  }

  onMouseEnter = () => {
    if (this.state.currentStatus === 'joined') {
      this.setState({
        currentStatus: 'leave',
        onHover: true
      });
    }
  }

  onMouseOut = () => {
    if (this.state.currentStatus === 'leave' && this.state.onHover) {
      this.setState({
        currentStatus: 'joined',
        onHover: false
      });
    }
  }

  onClick = () => {
    if (this.state.currentStatus === 'join') {
      this.props.services.event.join(this.props.id)
        .then(data => data.event)
        .then(this.props.onChange);
      this.setState({
        currentStatus: 'joined'
      });
    } else if (this.state.currentStatus === 'leave') {
      this.props.services.event.leave(this.props.id)
        .then(data => data.event)
        .then(this.props.onChange);
      this.setState({
        currentStatus: 'join'
      });
    } else if (this.state.currentStatus === 'edit') {
      this.setState({
        editEventFormOpen: true
      });
    }
  }

  _renderModal() {
    return (
      <Modal
        size="small"
        closeOnRootNodeClick={false}
        open={this.state.editEventFormOpen}
        >
        <Modal.Content>
          <CreateEventForm services={this.props.services}
            editMode={true}
            onSave={() => { this.setState({ editEventFormOpen: false }); }}
            onEventChange={ this.props.onChange }
            onEventDelete={ this.props.onDelete }
            eventData={this.props.data}/>
        </Modal.Content>
      </Modal>
    );
  }

  render() {
    const config = this.status[this.state.currentStatus];
    return (
      <Label
        className="EventStatusToken"
        color={config.color}
        size="medium"
        onClick={this.onClick}
        onMouseEnter={this.onMouseEnter}
        onMouseOut={this.onMouseOut}>
        <Icon name={config.icon} /> {config.text}
        {this._renderModal()}
      </Label>
    );
  }
}

export default EventStatusToken;
