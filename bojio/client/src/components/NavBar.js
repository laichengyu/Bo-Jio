import React, { Component } from 'react';
import logo from '../img/logo.png';
import { Loader, Image, Menu, Icon, Input, Dropdown, Popup, Modal } from 'semantic-ui-react'
import CreateEventForm from './CreateEventForm';
import { Link, withRouter } from 'react-router-dom'
import './NavBar.css';

class NavBar extends Component {
  ANY_CATEGORY_OPTION = { key: 'all', text: 'All', value: 'all', searchIcon: 'search' };

  state = {
    user: null,
    isLoading: true,
    categories: [this.ANY_CATEGORY_OPTION],
    selectedCategory: this.ANY_CATEGORY_OPTION,
    searchText: "",
    createEventFormOpen: false
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
    this.props.onEventFilter({ category: data.value });
  }

  onSearchTextChange = (event, data) => {
    this.setState({
      searchText: data.value
    });
    this.props.onEventFilter({ text: data.value });
  }

  _renderModal() {
    return (
      <Modal
        size="small"
        closeOnRootNodeClick={false}
        open={this.state.createEventFormOpen}
        >
        <Modal.Content>
          <CreateEventForm services={this.props.services}
            onSave={() => { this.setState({createEventFormOpen: false}); }}
            onEventAdd={ this.props.onEventAdd }/>
        </Modal.Content>
      </Modal>
    );
  }

  render() {
    const userToken = !this.state.isLoading
      ? <Image shape='circular' src={this.state.user.pictureUrl} width="35px" />
      : <Loader active inline='centered'size='small' />;

    const addEventIcon = (<Popup
      trigger={
      <Icon name='add to calendar'
        size='large'
        link />}
      content='Create an event'
      position='bottom center'
      inverted
    />
    );

    const Logo = withRouter(({ history }) => (
      <Menu.Item name='home' onClick={ () => history.push('/') }>
        <Image width='70px' src={logo} />
      </Menu.Item>
    ));

    const HomeButton = withRouter(({ history }) => (
      <Menu.Item link onClick={() => history.push('/') } className="NavBar-homeButton">
        Home
      </Menu.Item>
    ));

    const MyEventsIcon = withRouter(({ history }) => (
      <Menu.Item icon link onClick={() => { history.push('/myevents') }}>
        <Popup
          trigger={<Icon name='book'
            size='large'
            link />}
          content='My Events'
          position='bottom center'
          inverted
        />
      </Menu.Item>
    ));

    return (
      <Menu fixed='top' id='NavBar-menu' borderless>
        {this._renderModal()}
        <Logo />

        <Menu.Item id='NavBar-search' name='search-bar' fitted>
            <Input
              fluid
              action={
                <Dropdown
                  button
                  floating
                  icon={this.state.selectedCategory.searchIcon}
                  header={
                    <Dropdown.Header icon='list layout' content='Filter by category' />
                  }
                  options={this.state.categories.map(
                    category => {
                      var newCategory = {...category};
                      delete newCategory.searchIcon;
                      return newCategory
                    })}
                  className='icon yellow'
                  value={this.state.selectedCategory.value}
                  onChange={this.onSelectCategory}
                  />}
              onChange={this.onSearchTextChange}
              actionPosition='left'
              placeholder='Search...'
              size='large'
              value={this.state.searchText}
            />
        </Menu.Item>

        <Menu.Menu position='right'>
          <HomeButton />

          <Menu.Item icon link onClick={() => this.setState({createEventFormOpen: true})}>
            {addEventIcon}
          </Menu.Item>

          <MyEventsIcon />

          <Menu.Item link>
            {<Dropdown
                className="NavBar-userDropdown"
                trigger={userToken}
                icon={null}
                options={[
                  {
                    key: 'user',
                    text: <span>Signed in as <strong>{!this.state.isLoading ? this.state.user.name : ""}</strong></span>,
                    disabled: true,
                  },
                  { key: 'sign-out', text: 'Sign Out', icon: 'sign out', onClick: this.logOut },
                ]} />}
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

  logOut = () => {
    window.location = this._getLogoutUrl();
  }
}

export default NavBar;
