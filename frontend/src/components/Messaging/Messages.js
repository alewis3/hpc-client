import React, { Component } from 'react';
import './Messages.scss';
import axios from 'axios';
import { Divider } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
      messages: [],
      talkingTo: ''
    }
  }

  async componentDidMount() {
    var self = this;
    var apiBaseUrl = "https://hpcompost.com/api/messages";

    await axios.get(apiBaseUrl + '/conversations?id=' + this.props.props.id).then(response => {
      self.setState({ conversations: response.data.conversations, talkingTo: response.data.conversations[0].id })
    })

    await axios.get(apiBaseUrl + '/conversation?loggedInId=' + this.props.props.id + '&otherId=' + self.state.talkingTo).then(response => {
      if (response.data.success) {
        self.setState({ messages: response.data.messages })
      }
    }).catch(error => {
      console.log(error);
    })
  }

  renderConvos() {
    return this.state.conversations.map((name, i) => {
      return (
        <div key={i}>
          <List component="nav">
            <ListItem
              button
              onClick={() => this.openConvo(this.state.conversations[i].id)}
            >
              <ListItemText primary={this.state.conversations[i].name.first.concat(' ', this.state.conversations[i].name.last)} />
            </ListItem>
          </List>
          <Divider />
        </div>
      )
    })
  }

  async openConvo(id) {
    var self = this;
    var apiBaseUrl = "https://hpcompost.com/api/messages";
    
    await axios.get(apiBaseUrl + '/conversation?loggedInId=' + this.props.props.id + '&otherId=' + id).then(response => {
      if (response.data.success) {
        self.setState({ messages: response.data.messages })
      }
    }).catch(error => {
      console.log(error);
    })
  }

  renderSenderMessages() {
    if (this.state.messages != undefined) {
      return this.state.messages.map((message, i) => {
        if (message.senderId == this.props.props.id) {
          return (
            <div key={i}>
              {message.message}
            </div>
          )
        }
      })
    }
  }

  renderReceiverMessages() {
    if (this.state.messages != undefined) {
      return this.state.messages.map((message, i) => {
        if (message.senderId !== this.props.props.id) {
          return (
            <div key={i}>
              {message.message}
            </div>
          )
        }
      })
    }
  }

  render() {
    return (
      <div className="parent">
        <div className="list">
          {this.renderConvos()}
        </div>
        <div className="convo">
          <div className="convo-guest">
            {this.renderReceiverMessages()}
          </div>
          <div className="convo-sending">
            {this.renderSenderMessages()}
          </div>
        </div>
      </div>
    )
  }
}

export default Messages;