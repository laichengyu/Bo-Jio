import React, { Component } from 'react';
import logo from '../img/logo.png';
import { Loader, Header, Image, Menu, Icon, Input, Dropdown, Popup } from 'semantic-ui-react'
import './NavBar.css';

class NavBar extends Component {
  state = {
    user: null,
    isLoading: true
  }

  options = [
    { key: 'fun', text: 'All', value: 'fun' },
    { key: 'org', text: 'Movies', value: 'org' },
    { key: 'site', text: 'LOL', value: 'site' },
  ]

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
    const userToken = !this.state.isLoading
      ? <Header as='h5' image={<Image shape='circular' src={this.state.user.pictureUrl} />} content={this.state.user.firstName} />
      : <Loader active inline='centered'size='small' />;

    const addEventIcon = <Popup
      trigger={<Icon name='add to calendar icon' size='large' link />}
      content='Create an event'
      position='bottom center'
      inverted
    />;

    const myEventsIcon = <Popup
      trigger={<Icon name='book icon' size='large' link />}
      content='My Events'
      position='bottom center'
      inverted
    />;
    return (
      <Menu size='medium' fixed='top' id='NavBar-menu' compact borderless pointing>
        <Menu.Item name='home'>
          <Image width='70px' src={logo} />
        </Menu.Item>


        <Menu.Item id='NavBar-search' name='search-bar' position='standard'>
            <Input
              fluid
              action={<Dropdown button floating options={this.options} className='teal' defaultValue='fun' />}
              actionPosition='left'
              placeholder='Search...'
              size='large'
            />
        </Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item icon>
            {addEventIcon}
          </Menu.Item>

          <Menu.Item icon>
            {myEventsIcon}
          </Menu.Item>

          <Menu.Item>
            {userToken}
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default NavBar;
