import React, { Component } from 'react';
import { Divider } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Conversation from './Conversation'
import axios from 'axios';

class ConvoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: []
    }
  }

  componentDidMount() {
    var self = this;
    var apiBaseUrl = "https://hpcompost.com/api/messages";

    console.log(self.props.props.props.id)

    axios.get(apiBaseUrl + '/conversations?id=' + self.props.props.props.id).then(function(response) {
      if (response.data.success) {
        console.log(response)
        self.setState({ conversations: response.data.conversations })
      }
    })
  }

  renderConvos() {
    return this.state.conversations.map((name, i) => {
      return (
        <div key={i}>
          <List component="nav">
            <ListItem
              button
              onClick={this.openConvo}
            >
              <ListItemText primary={this.state.conversations[i].name.first.concat(' ', this.state.conversations[i].name.last)} />
            </ListItem>
          </List>
          <Divider />
        </div>
      )
    })
  }

  openConvo(props) {
    return <Conversation props={props} />
  }

  render() {
    return (
      <div>
        {this.renderConvos(this.props)}
      </div>
    )
  }
}

export default ConvoList;