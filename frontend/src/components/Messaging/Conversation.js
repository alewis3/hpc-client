import React, { Component } from 'react';

class Conversation extends Component {
  constructor(props) {
    super(props);
  }

  renderMessages() {

  }

  render() {
    return(
      <div>
        {this.renderMessages()}
      </div>
    )
  }
}

export default Conversation;