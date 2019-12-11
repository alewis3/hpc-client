import { ThemeProvider } from '@material-ui/core/styles';
import { AppBar } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import React, { Component } from 'react';
import axios from 'axios';
import theme from '../theme';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import {
  BrowserRouter as Router,
  Redirect
} from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  // loginButton will call api with users email and pw
  // will recieve code and log appropriate response
  async loginButton(event) {
    var self = this;
    var apiBaseUrl = "https://hpcompost.com/api/users";

    // test for empty fields
    if (this.state.email === "" || this.state.password === "") {
      alert("Fill in all fields!")
    }

    // trim white space from fields
    let emailTrimmed = this.state.email.trim()
    let passwordTrimmed = this.state.password.trim()

    var payload = {
      "email": emailTrimmed,
      "password": passwordTrimmed
    }

    await axios.get(apiBaseUrl + '/login', payload).then(function (response) {
      if (response.status == 200 && response.data.accountType == "Contributor") {
        window.location.href = "https://hpcompost.com/map";
      } else if (response.status == 200 && response.data.accountType == "Homeowner" || response.data.accountType == "Business Owner") {
        // window.location.href = "https://hpcompost.com/dashboard";
        self.setState({ email: response.data.email });
        self.redirect()
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  redirect() {
    return (
      <Redirect
        to={{
          pathname: "/dashboard",
          state: { 
            email: this.state.email,
            pw: this.state.password
           }
        }}
      />
    )
  }

  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <div>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" style={style.title}>
                  Login
                </Typography>
              </Toolbar>
            </AppBar>
            <br />
            <br />
            <TextField
              label="Email"
              onChange={(event, newValue) => this.setState({ email: event.target.value })}
            />
            <br />
            <br />
            <TextField
              label="Password"
              type="password"
              onChange={(event, newValue) => this.setState({ password: event.target.value })}
            />
            <br />
            <br />
            <Button
              variant="contained"
              color="primary"
              style={style}
              onClick={(event) => this.loginButton(event)}
            >Submit</Button>
          </div>
        </ThemeProvider>
      </div>
    )
  }
}

const style = {
  margin: 15,
  title: {
    flexGrow: 1
  }
};

export default Login;
