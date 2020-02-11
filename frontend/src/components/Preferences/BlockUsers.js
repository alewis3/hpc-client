import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import theme from '../../theme';

class BlockUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    }
  }

  blockUser() {

  }

  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <TextField
            id="outlined-basic"
            label="User Email"
            variant="outlined"
            style={style}
            onChange={(event) => this.setState({ currentPw: event.target.value })}
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            style={style}
            onClick={(event) => this.blockUser(event)}
          >Block User</Button>
        </ThemeProvider>
      </div>
    )
  }
}

const style = {
  margin: 30,
  title: {
    flexGrow: 1
  }
};

export default BlockUsers;