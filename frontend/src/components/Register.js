import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { AppBar } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import RadioButtons from './RadioButtons'
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import theme from '../theme';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import './Register.css';
import Checkbox from '@material-ui/core/Checkbox';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        first: '',
        last: ''
      },
      email: '',
      password: '',
      location: {
        "address": '',
        "city": '',
        "state": '',
        "zip": 0
      },
      above18: true,
      accountType: null,
    }
  }

  handleAddressChange(description) {
    var address = description.split(',');
    this.setState(prev => ({ location: { ...prev.location, address: address[0] } }));
    this.setState(prev => ({ location: { ...prev.location, city: address[1] } }));
    this.setState(prev => ({ location: { ...prev.location, state: address[2] } }));
  }

  handleZipChange = (event) => {
    const inputZip = event.target.value;
    this.setState(prev => ({ location: { ...prev.location, zip: inputZip } }))
  }

  handleFirstNameChange = (event) => {
    const inputFirstName = event.target.value;
    this.setState(prev => ({ name: { ...prev.name, first: inputFirstName } }))
  }

  handleLastNameChange = (event) => {
    const inputLastName = event.target.value;
    this.setState(prev => ({ name: { ...prev.name, last: inputLastName } }))
  }

  // regexTestPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

  async registerButton(event) {
    var apiBasedUrl = "https://hpcompost.com/api/users";
    var self = this;

    if (this.state.name.first === "" ||
      this.state.name.last === "" ||
      this.state.email === "" ||
      this.state.password === "" ||
      this.state.location.address === "" ||
      this.state.location.city === "" ||
      this.state.location.state === "" ||
      this.state.accountType === null) {
      alert("Fill in all fields!")
      console.log("Missing fields")
      return;
    }

    // trim fields whitespace
    let firstNameTrimmed = this.state.name.first.trim()
    let lastNameTrimmed = this.state.name.last.trim()
    let emailTrimmed = this.state.email.trim()
    let passwordTrimmed = this.state.password.trim()
    let streetAddressTrimmed = this.state.location.address.trim()
    let cityTrimmed = this.state.location.city.trim()
    let stateTrimmed = this.state.location.state.trim()

    // // test pw and zip code
    // if (!this.regexTestPassword.test(this.passwordTrimmed)) {
    //   alert("weak pw")
    // }

    var payload = {
      "name": {
        "first": firstNameTrimmed,
        "last": lastNameTrimmed
      },
      "email": emailTrimmed,
      "password": passwordTrimmed,
      "location": {
        "address": streetAddressTrimmed,
        "city": cityTrimmed,
        "state": stateTrimmed,
        "zip": this.state.location.zip
      },
      "accountType": this.state.accountType
    }

    console.log("payload: ", payload)

    await axios.post(apiBasedUrl + '/register', payload).then(function (response) {
      console.log(response);
      if (response.data.registrationStatus == true) {
        console.log("registration successful");
        alert("Registration successful!")
        window.location.href = "https://hpcompost.com/login"
      } else {
        console.log("incorrect pw");
        alert("incorrect pw");
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <div>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" style={style.title}>
                  Register
                </Typography>
              </Toolbar>
            </AppBar>
            <br />
            <br />
            <TextField
              label="First Name"
              onChange={this.handleFirstNameChange}
            />
            <br />
            <br />
            <TextField
              label="Last Name"
              onChange={this.handleLastNameChange}
            />
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
            <GooglePlacesAutocomplete
              onSelect={({ description }) => (
                this.handleAddressChange(description)
              )}
              inputClassName="addressStyle"
            />
            <br />
            <TextField
              label="Zip Code"
              type="number"
              onChange={this.handleZipChange}
            />
            <br />
            <br />
            <FormControlLabel
              control={
                <Checkbox
                  checked={!this.state.above18}
                  onChange={(event) => {
                    this.setState((prevState) => ({ above18: !prevState.above18 }));
                  }}
                  color="primary"
                />
              }
              label="I am above 18 years of age."
            />
            <br />
            <br />
            <FormControl component="fieldset">
              <FormLabel component="legend">Account Type</FormLabel>
              <RadioGroup aria-label="accountType" name="customized-radios" onChange={(event, newValue) => this.setState({ accountType: newValue })}>
                <FormControlLabel value="Contributor" control={<RadioButtons />} label="Contributor" />
                <FormControlLabel value="Homeowner" control={<RadioButtons />} label="Homeowner" />
                <FormControlLabel value="Business Owner" control={<RadioButtons />} label="Businessowner" />
              </RadioGroup>
            </FormControl>
            <br />
            <br />
            <Button
              variant="contained"
              color="primary"
              style={style}
              onClick={(event) => this.registerButton(event)}
            >Submit</Button>
          </div>
        </ThemeProvider>
      </div>
    );
  }
}

const style = {
  margin: 15,
  title: {
    flexGrow: 1
  }
};

export default Register;
