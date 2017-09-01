import React, { Component } from 'react';
import { Image, Dimmer, Loader, Segment } from 'semantic-ui-react';
import './GiphySearch.css';

class GiphySearch extends Component {
  API_KEY = "dc6zaTOxFJmzC";
  state = {
    isLoading: true,
    images: [],
    selected: null,
    timeout: null
  };

  fetchGiphy() {
    fetch(`http://api.giphy.com/v1/gifs/search?q=${this.props.searchText}&api_key=${this.API_KEY}`)
      .then(res => res.json())
      .then(data => data.data.map(entry => {
        return {
          id: entry.id,
          original: entry.images.original.url,
          fixedHeight: entry.images.fixed_height_downsampled.url
        };
      }))
      .then(images => {
        this.setState({
          isLoading: false,
          images: images
        });
      });
  }

  update() {
    const me = this;
    clearTimeout(this.state.timeout);
    this.setState({
      timeout: setTimeout(function() {
        me.fetchGiphy();
      }, 500)
    });
  }

  componentDidMount() {
    this.update();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchText !== this.props.searchText) {
      this.setState({
        isLoading: true,
        images: [],
        selected: null
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      this.update();
    }
  }

  _renderImages() {
    return (
      <div className="GiphySearch-images">
      {
        this.state.images.map((image, index) =>
          <Image
            key={image.id}
            className="GiphySearch-image"
            src={image.fixedHeight}
            label={
              (index === this.state.selected)
                ? { attached: 'right', icon: 'checkmark', color: 'green', content: 'Selected' }
                : null
            }
            onClick={
              (event) => {
                this.setState({
                  selected: index
                });
                this.props.onImageSelect(image.original);
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
