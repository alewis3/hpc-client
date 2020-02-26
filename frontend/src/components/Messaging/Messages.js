import React, { Component } from 'react';
import './Messages.scss';
import axios from 'axios';
import { Divider, Button } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import SendRoundedIcon from '@material-ui/icons/SendRounded';

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
      messages: [],
      talkingTo: '',
      newMessage: ''
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

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.newConvo()
    }
  }

  async newConvo() {
    var self = this;
    var apiBaseUrl = "https://hpcompost.com/api/preferences";

    await axios.get(apiBaseUrl + '/profile?id=' + self.props.props.sendMessageTo).then(response => {
      if (response.data.success) {
        var convo = {
          email: response.data.user.email,
          name: {
            first: response.data.user.name.first,
            last: response.data.user.name.last
          },
          id: self.props.props.sendMessageTo
        }
        var joined = this.state.conversations.concat(convo);
        self.setState({ conversations: joined })
        self.openConvo(self.props.props.sendMessageTo)
      }
    }).catch(error => {
      console.log(error)
    });
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
            <div key={i} style={{ paddingBottom: '5px' }}>
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
            <div key={i} style={{ paddingBottom: '5px' }}>
              {message.message}
            </div>
          )
        }
      })
    }
  }

  // doesn't work correctly
  async sendMessage(event) {
    var self = this;
    var apiBaseUrl = "https://hpcompost.com/api";

    var payload = {
      "senderId": self.props.props.id,
      "receiverId": self.state.talkingTo,
      "message": self.state.newMessage
    }

    await axios.post(apiBaseUrl + '/messages', payload).then(response => {
      if (response.data.success) {
        self.setState({ newMessage: '' })

        // this doesn't work yet
        self.forceUpdate()
      }
    }).catch(error => {
      console.log(error);
    });
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
          <div className="convo-text">
            <TextField
              fullWidth
              onChange={(event) => { this.setState({ newMessage: event.target.value }) }}
              value={this.state.newMessage}
            />
            <SendRoundedIcon
              style={{ paddingLeft: '10px' }}
              onClick={(event) => { this.sendMessage(event) }}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Messages;