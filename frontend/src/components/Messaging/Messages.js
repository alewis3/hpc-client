import React, { Component } from 'react';
import List from './ConvoList';
import Conversation from './Conversation';
import './Messages.scss';

class Messages extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="parent">
        <div className="list">
          <List props={this.props} />
        </div>
        <div className="convo">
          <Conversation props={this.props} />
        </div>
      </div>
    )
  }
}


export default Messages;