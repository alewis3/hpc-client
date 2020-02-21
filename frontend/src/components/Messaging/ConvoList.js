import React, { Component } from 'react';
import { Divider } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Conversation from './Conversation'

class ConvoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: ["Evangeline Mavrommati", "Amanda Lewis", "Fairen Sutton"]
    }
  }

  componentDidMount() {

  }

  renderConvos() {
    return this.state.conversations.map((name, i) => {
      return (
        <div key={i}>
          <Divider />
          <List component="nav">
            <ListItem
              button
              onClick={this.openConvo}
            >
              <ListItemText primary={name} />
            </ListItem>
          </List>
          <Divider />
        </div>
      )
    })
  }

  openConvo() {
    return <Conversation props={this.props} />
  }

  render() {
    return (
      <div>
        {this.renderConvos()}
      </div>
    )
  }
}

export default ConvoList;