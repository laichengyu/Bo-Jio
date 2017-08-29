import React, { Component } from 'react';
import Avatar from './Avatar';
import { Label } from 'semantic-ui-react';
import './Facepile.css';

class Facepile extends Component {
  MAX = 4;

  render() {
    return (
      <div className="Facepile">
        {
          this.props.ids.map(
            (id, index) => {
              if (index < this.MAX - 1 || (index === (this.MAX - 1) && this.MAX === this.props.ids.length)) {
                return <Avatar
                  key={`Facepile.${index}`}
                  id={id}
                  services={this.props.services}
                />;
              } else if (index === this.MAX - 1) {
                return <Label key={`Facepile.${index}`} id="Facepile-label" color="teal" circular size="large">+{this.props.ids.length - this.MAX + 1}</Label>;
              } else {
                return null;
              }
            }
          )
        }
      </div>
    );
  }
}

export default Facepile;
