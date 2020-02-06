import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';
import axios from 'axios';
import RadioButtons from './RadioButtons'
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';

class RegisterModal extends Component {
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
      open: false
    }
  }

  handleAddressChange(event) {
    const address = event.target.value;
    this.setState(prev => ({ location: { ...prev.location, address: address } }))
    // var address = description.split(',');
    // this.setState(prev => ({ location: { ...prev.location, address: address[0] } }));
    // this.setState(prev => ({ location: { ...prev.location, city: address[1] } }));
    // this.setState(prev => ({ location: { ...prev.location, state: address[2] } }));
  }

  handleCityChange(event) {
    const city = event.target.value;
    this.setState(prev => ({ location: { ...prev.location, city: city } }))
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
        "zip": parseInt(this.state.location.zip, 10)
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
          <Button variant="outlined" color="primary" onClick={() => this.setState({ open: true })}>
            Register
          </Button>
          <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Register</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Welcome to Host, Post, and Compost!
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                style={{ margin: 16 }}
                label="First Name"
                onChange={this.handleFirstNameChange}
              />
              <TextField
                autoFocus
                margin="dense"
                style={{ margin: 16 }}
                label="Last Name"
                onChange={this.handleLastNameChange}
              />
              <TextField
                autoFocus
                margin="dense"
                label="Email Address"
                type="email"
                style={{ margin: 16 }}
                onChange={(event) => this.setState({ email: event.target.value })}
              />
              <TextField
                autoFocus
                margin="dense"
                label="Password"
                type="password"
                style={{ margin: 16 }}
                onChange={(event, newValue) => this.setState({ password: event.target.value })}
              />
              <TextField
                autoFocus
                margin="dense"
                label="Street Address"
                fullWidth
                style={{ margin: 16 }}
                onChange={this.handleAddressChange}
              />
              <TextField
                autoFocus
                margin="dense"
                label="City"
                style={{ margin: 16 }}
                onChange={this.handleCityChange}
              />
              <TextField
                autoFocus
                margin="dense"
                label="Zip Code"
                type="number"
                style={{ margin: 16 }}
                onChange={this.handleZipChange}
              />
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
                autoFocus
                margin="dense"
                style={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}
              />
              <FormControl component="fieldset" fullWidth={true}>
                <FormLabel component="legend">Account Type</FormLabel>
                <RadioGroup aria-label="accountType" name="customized-radios" onChange={(event, newValue) => this.setState({ accountType: newValue })}>
                  <FormControlLabel value="Contributor" control={<RadioButtons />} label="Contributor" />
                  <FormControlLabel value="Homeowner" control={<RadioButtons />} label="Homeowner" />
                  <FormControlLabel value="Business Owner" control={<RadioButtons />} label="Businessowner" />
                </RadioGroup>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.setState({ open: false })} color="primary">
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={(event) => this.registerButton(event)}
              >Submit</Button>
            </DialogActions>
          </Dialog>
        </ThemeProvider>
      </div>
    )
  }
}

export default RegisterModal;
