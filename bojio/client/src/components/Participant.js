import React, { Component } from 'react';
import { Image, List } from 'semantic-ui-react';
import './Participant.css';

class Participant extends Component {
  state = {
    isLoading: true,
    image: "https://cdn0.vox-cdn.com/images/verge/default-avatar.v989902574302a6378709709f7baab789b242ebbb.gif",
    name: ""
  }

  componentDidMount() {
    this.props.services
      .facebook
      .userInfo(this.props.id)
      .then(user => {
        this.setState({
          isLoading: false,
          image: user.pictureUrl,
          name: user.name
        });
      });
  }

  render() {
    return (
      <List.Item className="Participant">
        <Image avatar src={this.state.image} />
        <List.Content>
          <List.Header className="Participant-header">{this.state.name}</List.Header>
        </List.Content>
      </List.Item>
    );
  }
}

export default Participant;
