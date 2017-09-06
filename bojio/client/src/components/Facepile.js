import React, { Component } from 'react';
import Avatar from './Avatar';
import { Label, Modal, Header, Button } from 'semantic-ui-react';
import InviteTokenizer from './InviteTokenizer';
import './Facepile.css';

class Facepile extends Component {
  state = {
    inviteModalOpen: false,
    inviteList: []
  }

  MAX = 4;

  onAddButtonClick = () => {
    this.setState({
      inviteModalOpen: true
    });
  };

  renderModal() {
    return (
      <Modal
        size="small"
        open={this.state.inviteModalOpen}
        >
        <Modal.Content>
          <Header as='h2'>More friends coming?</Header>
          <InviteTokenizer
            services={this.props.services}
            onInviteListChange={inviteList => this.setState({inviteList: inviteList})}/>

          <div className="Facepile-modalButtons">
            <Button
              floated="right"
              className="ui primary button"
              onClick={() => {
                this.props.services.event
                  .addParticipants(this.props.eventId, this.state.inviteList.map(e => e.value))
                  .then(event => {
                    this.props.onChange(event);
                    this.setState({
                      inviteModalOpen: false,
                      inviteList: []
                    });
                  });
              }}
            >Add</Button>
            <Button
              floated="right"
              className="ui red button"
              onClick={() => {
                this.setState({
                  inviteModalOpen: false,
                  inviteList: []
                });
              }}
            >Cancel</Button>
          </div>
        </Modal.Content>
      </Modal>
    );
  }

  render() {
    return (
      <div className="Facepile">
        {this.renderModal()}
        {
          this.props.ids.map(
            (id, index) => {
              if (index < this.MAX) {
                return <Avatar
                  key={`Facepile.${id}`}
                  id={id}
                  services={this.props.services}
                />;
              } else {
                return null;
              }
            }
          )
        }
        <Label
          key="Facepile.Overflow"
          id="Facepile-label"
          color="yellow"
          circular
          size="large"
          onClick={this.onAddButtonClick}>
          +{this.props.ids.length - this.MAX > 0 ? this.props.ids.length - this.MAX : ""}
        </Label>
      </div>
    );
  }
}

export default Facepile;
