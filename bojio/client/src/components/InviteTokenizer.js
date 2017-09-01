import React, { Component } from 'react';
import { Segment, Label, Icon, Dropdown } from 'semantic-ui-react';
import './InviteTokenizer.css';
import AutosizeInput from 'react-input-autosize'

class InviteTokenizer extends Component {
  state = {
    inputValue: "",
    tokens: [],
    options: [],
    selected: null,
    counter: 0
  }

  componentDidMount() {
    this.props.services.facebook
      .friendList()
      .then(friends =>
        friends.map((friend) => {
          return {
            text: friend.name,
            value: friend.id,
            image: { avatar: true, src: friend.pictureUrl }
          }
        })
      ).then(friends => {
        this.setState({
          options: friends
        });
      });
  }

  onContainerClick = () => {
    this._input.focus();
  }

  onSelectUser = (value) => {
    const existingTokens = this.state.tokens.filter(option => value === option.value);
    const entry = existingTokens.length === 0
                    ? this.state.options.filter(option => value === option.value)
                    : [];
    const newTokens = this.state.tokens.concat(entry);

    this.setState({
      inputValue: "",
      tokens: newTokens,
      counter: this.state.counter + 1,
      selected: null
    });

    this.props.onInviteListChange(newTokens);
  }

  onChangeUser = (event, data) => {
    if (!data.value) {
      return;
    }

    this.setState({
      selected: data.value
    });

    if (event instanceof KeyboardEvent) {
      return;
    }

    this._input.focus();
    this.onSelectUser(data.value);
  }

  onRemoveUser(value) {
    return () => {
      const newTokens = this.state.tokens.filter(token => value !== token.value);
      this.setState({
        tokens: newTokens
      });
      this.props.onInviteListChange(newTokens);
    }
  }

  renderToken(data) {
    return (
      <Label key={data.value} as='a' image basic size="medium">
        <img src={data.image.src} alt={data.value}/>
        {data.text}
        <Icon name='delete' onClick={this.onRemoveUser(data.value)}/>
      </Label>
    );
  }

  onInputKeyPress = (event) => {
    if (event.key === 'Enter' && this.state.selected) {
      this.onSelectUser(this.state.selected);
      event.preventDefault();
      event.stopPropagation();
    }

    if (event.key === 'Backspace' && this.state.inputValue.length === 0 && this.state.tokens.length > 0) {
      var newTokens = this.state.tokens;
      newTokens.pop();
      this.setState({
        tokens: newTokens,
        counter: this.state.counter + 1
      });
    }
  }

  matchOption = (option) => {
    return (option.text.toLowerCase().indexOf(this.state.inputValue.toLowerCase()) !== -1);
  }

  render() {
    const matchingOptions = this.state.options.filter(this.matchOption);
    return (
      <Segment onClick={this.onContainerClick}>
        <span className="InviteTokenizer-tokenizer">
          {this.state.tokens.map(entry => this.renderToken(entry))}
        </span>
        <span className="ui transparent input InviteTokenizer-inputContainer">
          <Dropdown
            key={`InviteTokenizer-typeahead.${this.state.counter}`}
            className="InviteTokenizer-dropdown"
            inline
            scrolling
            icon={null}
            options={matchingOptions}
            open={(this.state.inputValue.length > 0)}
            onChange={this.onChangeUser}
            />
          <AutosizeInput
            ref={(e) => this._input = e}
            value={this.state.inputValue}
            onChange={(event) => {
              this.setState({
                inputValue: event.target.value
              });
            }}
            onKeyDown={this.onInputKeyPress}
            placeholder={
              this.state.tokens.length > 0
                ? ""
                : "Let's invite someone!"
            }
            />
        </span>
      </Segment>
    )
  }
}

export default InviteTokenizer;
