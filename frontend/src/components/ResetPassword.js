import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import theme from '../theme';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPw: this.props.pw,
      newPw: ''
    }
  }

  async reset() {
    var self = this;
    var apiBaseUrl = "https://hpcompost.com/api/user";

    var payload = {
      "email": this.props.email,
      "newPw": this.state.newPw
    }

    await axios.post(apiBaseUrl + '/resetPassword', payload).then(function (response) {
      if (response.status = 200) {
        alert("Password reset successfully");
      } else {
        alert("Failed to reset password. Please try again later.")
      }
    }).catch(function (error) {
      console.log(error)
    });
  }

  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <TextField
            id="outlined-basic"
            label="Current Password"
            type="password"
            variant="outlined"
            style={style}
            onChange
          />
          <TextField
            id="outlined-basic"
            label="New Password"
            type="password"
            variant="outlined"
            style={style}
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            style={style}
            onClick={(event) => this.reset(event)}
          >Reest Password</Button>
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

export default ResetPassword;