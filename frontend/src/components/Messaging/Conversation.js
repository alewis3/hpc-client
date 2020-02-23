import React, { Component } from 'react';

class Conversation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          "sentAt": "2020-02-21T17:15:22.743Z",
          "senderId": "5de5334cf7bdb6eeb7edf5f7",
          "receiverId": "5de53318f7bdb6eeb7edf5f6",
          "message": "Hello"
        },
        {
          "sentAt": "2020-02-21T17:45:25.870Z",
          "senderId": "5de53318f7bdb6eeb7edf5f6",
          "receiverId": "5de5334cf7bdb6eeb7edf5f7",
          "message": "world"
        }
      ]
    }
  }

  componentDidMount() {

  }

  renderMessages() {

  }

  render() {
    return (
      <div>
        {this.renderMessages()}
      </div>
    )
  }
}

export default Conversation;