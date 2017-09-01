import React, { Component } from 'react';
import { Segment, Label, Icon, Dropdown } from 'semantic-ui-react';
import './InviteTokenizer.css';
import AutosizeInput from 'react-input-autosize'

class InviteTokenizer extends Component {
  state = {
    inputValue: "",
    tokens: [],
    selected: null,
    counter: 0
  }

  friendOptions = [
   {
     text: 'Jenny Hess2',
     value: 'Jenny Hess2',
     image: { avatar: true, src: 'https://react.semantic-ui.com/assets/images/avatar/small/jenny.jpg' },
   },
   {
     text: 'Jenny Hess3',
     value: 'Jenny Hess3',
     image: { avatar: true, src: 'https://react.semantic-ui.com/assets/images/avatar/small/jenny.jpg' },
   },
   {
     text: 'Jenny Hess4',
     value: 'Jenny Hess4',
     image: { avatar: true, src: 'https://react.semantic-ui.com/assets/images/avatar/small/jenny.jpg' },
   },
   {
     text: 'Jenny Hess5',
     value: 'Jenny Hess5',
     image: { avatar: true, src: 'https://react.semantic-ui.com/assets/images/avatar/small/jenny.jpg' },
   },
   {
     text: 'Jenny Hess6',
     value: 'Jenny Hess6',
     image: { avatar: true, src: 'https://react.semantic-ui.com/assets/images/avatar/small/jenny.jpg' },
   },
   {
     text: 'Jenny Hess7',
     value: 'Jenny Hess7',
     image: { avatar: true, src: 'https://react.semantic-ui.com/assets/images/avatar/small/jenny.jpg' },
   },
   {
     text: 'Jenny Hess8',
     value: 'Jenny Hess8',
     image: { avatar: true, src: 'https://react.semantic-ui.com/assets/images/avatar/small/jenny.jpg' },
   },
   {
     text: 'Jenny Hess9',
     value: 'Jenny Hess9',
     image: { avatar: true, src: 'https://react.semantic-ui.com/assets/images/avatar/small/jenny.jpg' },
   },
   {
     text: 'Jenny Hess10',
     value: 'Jenny Hess10',
     image: { avatar: true, src: 'https://react.semantic-ui.com/assets/images/avatar/small/jenny.jpg' },
   }
  ]

  onContainerClick = () => {
    this._input.focus();
  }

  onSelectUser = (value) => {
    const existingTokens = this.state.tokens.filter(option => value === option.value);
    const entry = existingTokens.length === 0
                    ? this.friendOptions.filter(option => value === option.value)
                    : [];

    this.setState({
      inputValue: "",
      tokens: this.state.tokens.concat(entry),
      counter: this.state.counter + 1,
      selected: null
    });
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
      this.setState({
        tokens: this.state.tokens.filter(token => value !== token.value)
      });
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

  render() {
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
            upward
            icon={null}
            options={this.friendOptions}
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
