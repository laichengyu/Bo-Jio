import React, { Component } from 'react';
import Services from '../services';
import Login from './Login';
import MainApp from './MainApp';
import { Dimmer, Loader } from 'semantic-ui-react'

class App extends Component {
  state = { user: null, isLoading: true, services: null }

  componentDidMount() {
    fetch('/api/status', { credentials: 'same-origin', cache: "no-store" })
      .then(res => res.json())
      .then(data => {
        if (data.status !== 'OK') {
          this.setState({
            isLoading: false
          });
          return;
        }

        const services = new Services(data.user.accessToken, data.user.id);
        services.facebook
          .userInfo()
          .then(user => {
            this.setState({
              services: services,
              user: user,
              isLoading: false
            });
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

    if (this.state.services) {
      return <MainApp services={this.state.services} />
    } else {
      return <Login />
    }
  }
}

export default App;