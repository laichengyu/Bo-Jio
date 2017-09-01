import React, { Component } from 'react';
import logo from '../img/logo.png';
import { Loader, Header, Image, Menu, Icon, Input, Dropdown, Popup, Modal } from 'semantic-ui-react'
import CreateEventForm from './CreateEventForm';
import './NavBar.css';

class NavBar extends Component {
  ANY_CATEGORY_OPTION = { key: 'all', text: 'All', value: 'all', searchIcon: 'search' };

  state = {
    user: null,
    isLoading: true,
    categories: [this.ANY_CATEGORY_OPTION],
    selectedCategory: this.ANY_CATEGORY_OPTION
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
    this.props.services.category
      .list()
      .then(categories =>
        categories.map(category => {
          return {
            text: category.name,
            value: category.id,
            searchIcon: category.icon,
            icon: <Icon name={category.icon} className='right floated' />
          }
        }))
      .then(categories => {
        this.setState({
          categories: [this.ANY_CATEGORY_OPTION, ...categories]
        });
      });
  }

  onSelectCategory = (event, data) => {
    const matchingCategory = this.state.categories.filter(category => (category.value === data.value))[0];
    this.setState({
      selectedCategory: matchingCategory
    });
  }

  _renderModal() {
    return (
      <Modal
        size="small"
        closeOnEscape={false}
        closeOnRootNodeClick={false}
        dimmer='inverted'
        trigger={<Icon name='add to calendar'
        size='large'
        link />}>
        <Modal.Content>
          <CreateEventForm />
        </Modal.Content>
      </Modal>
    );
  }

  render() {
    const userToken = !this.state.isLoading
      ? <Header as='h5' image={<Image shape='circular' src={this.state.user.pictureUrl} />} content={this.state.user.firstName} />
      : <Loader active inline='centered'size='small' />;

    /*const addEventIcon = <Popup
      trigger={<Icon name='add to calendar' size='large' link />}
      content='Create an event'
      position='bottom center'
      inverted
    />;*/
    const addEventIcon = this._renderModal();

    const myEventsIcon = <Popup
      trigger={<Icon name='book' size='large' link />}
      content='My Events'
      position='bottom center'
      inverted
    />;

    const signOutIcon = <Popup
      trigger={<a href={this._getLogoutUrl()}><Icon name='sign out' size='large' link /></a>}
      content='Sign Out'
      position='bottom center'
      inverted
    />;
    return (
      <Menu fixed='top' id='NavBar-menu' borderless>
        <Menu.Item name='home'>
          <Image width='70px' src={logo} />
        </Menu.Item>


        <Menu.Item id='NavBar-search' name='search-bar' fitted>
            <Input
              fluid
              action={
                <Dropdown
                  button
                  floating
                  icon={this.state.selectedCategory.searchIcon}
                  labeled
                  header={
                    <Dropdown.Header icon='list layout' content='Filter by category' />
                  }
                  options={this.state.categories.map(
                    category => {
                      var newCategory = {...category};
                      delete newCategory.searchIcon;
                      return newCategory
                    })}
                  className='icon teal'
                  value={this.state.selectedCategory.value}
                  onChange={this.onSelectCategory}
                  />}
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

          <Menu.Item icon>
            {signOutIcon}
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }

  _getLogoutUrl() {
    const env = process.env.NODE_ENV || "development";
    if (env === 'production') {
      return '/api/logout';
    } else {
      return 'http://localhost:8081/api/logout';
    }
  }
}

export default NavBar;
