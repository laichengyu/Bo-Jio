import React, { Component } from 'react';
import logo from '../img/logo.png';
import { Dimmer, Loader, Header, Image, Menu, Button } from 'semantic-ui-react'
import './NavBar.css';

class NavBar extends Component {
  state = {
    user: null,
    isLoading: true
  }

  componentDidMount() {
    this.props.services.facebook
      .userInfo()
      .then(user => {
        this.setState({
          user: user,
          isLoading: false
        });
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Dimmer active inverted>
          <Loader size='massive'>Loading</Loader>
        </Dimmer>
      )
    }
    return (
      <Menu size='large'>
        <Menu.Item name='home'>
          <Image size='tiny' src={logo} />
        </Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item>
            <Header as='h5' image={<Image shape='circular' src={this.state.user.pictureUrl} />} content={this.state.user.firstName} />
          </Menu.Item>

          <Menu.Item>
            <Button primary>Create Event</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default NavBar;
