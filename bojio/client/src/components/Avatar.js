import React, { Component } from 'react';
import { Image, Popup } from 'semantic-ui-react';

class Avatar extends Component {
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
          name: user.firstName
        })
      });
  }

  render() {
    return <span className="Avatar ">
      <Popup
        trigger={<Image avatar src={this.state.image} />}
        content={this.state.name}
        position='bottom center'
      />
    </span>;
  }
}

export default Avatar;
