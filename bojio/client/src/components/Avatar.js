import React, { Component } from 'react';
import { Image, Popup } from 'semantic-ui-react';

class Avatar extends Component {
  state = {
    isLoading: true,
    image: "https://cdn0.vox-cdn.com/images/verge/default-avatar.v989902574302a6378709709f7baab789b242ebbb.gif",
    name: ""
  }
  mounted = true

  componentDidMount() {
    this.props.services
      .facebook
      .userInfo(this.props.id)
      .then(user => {
        if (this.mounted) {
          this.setState({
            isLoading: false,
            image: user.pictureUrl,
            name: user.name
          });
        }
      });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  image() {
    if (this.props.width) {
      return <Image src={this.state.image} width={this.props.width} shape="circular" />;
    } else {
      return <Image avatar src={this.state.image} />;
    }
  }

  render() {
    return <span className="Avatar ">
      <Popup
        trigger={this.image()}
        content={this.state.name}
        position='bottom center'
      />
    </span>;
  }
}

export default Avatar;
