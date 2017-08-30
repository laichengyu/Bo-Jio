import React, { Component } from 'react';
import { Image, Dimmer, Loader, Segment } from 'semantic-ui-react';
import './GiphySearch.css';

class GiphySearch extends Component {
  API_KEY = "dc6zaTOxFJmzC";
  state = {
    isLoading: true,
    images: [],
    selected: null
  };

  fetchGiphy() {
    fetch(`http://api.giphy.com/v1/gifs/search?q=${this.props.searchText}&api_key=${this.API_KEY}`)
      .then(res => res.json())
      .then(data => data.data.map(entry =>
        entry.images.fixed_height_downsampled.url
      ))
      .then(images => {
        this.setState({
          isLoading: false,
          images: images
        });
      });
  }

  componentDidMount() {
    this.fetchGiphy();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isLoading: true,
      images: [],
      selected: null
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isLoading) {
      this.fetchGiphy();
    }
  }

  _renderImages() {
    return (
      <div className="GiphySearch-images">
      {
        this.state.images.map((image, index) =>
          <Image
            className="GiphySearch-image"
            src={image}
            label={
              (index === this.state.selected)
                ? { corner: 'right', icon: 'checkmark', color: 'green' }
                : null
            }
            onClick={
              (event) => {
                this.setState({
                  selected: index
                });
              }
            } />
        )
      }
      </div>
    );
  }

  _renderLoader() {
    return (
      <Segment className="GiphySearch-loader">
        <Dimmer active inverted>
          <Loader inverted size='large' />
        </Dimmer>
      </Segment>
    );
  }

  render() {
    return (
      <div className="GiphySearch">
        {this.state.isLoading ? this._renderLoader() : this._renderImages()}
      </div>
    );
  }
}

export default GiphySearch;
