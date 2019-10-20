import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      address: '',
      DOB: '',
    }
  }

  regexTestPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  regexTestEmail = new RegExp("^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$");

  registerButton(event) {
    var apiBasedUrl = "";
    var self = this;

    console.log("values", this.state.firstName, 
                          this.state.lastName, 
                          this.state.email, 
                          this.state.password, 
                          this.state.address, 
                          this.state.DOB);
    
    if (this.state.firstName == "" || this.state.lastName == "" || this.state.email == "" || this.state.password == "" || this.state.DOB == "" || this.state.address == "") {
      alert("Fill in all fields!")
      console.log("Missing fields")
    }

    // trim fields whitespace
    let firstNameTrimmed = this.state.firstName.trim()
    let lastNameTrimmed = this.state.lastName.trim()
    let emailTrimmed = this.state.email.trim()
    let passwordTrimmed = this.state.password.trim()
    let dobTrimmed = this.state.DOB.trim()
    let addressTrimmed = this.state.address.trim()

    // test for pw strength
    if (!this.regexTestEmail.test(this.emailTrimmed)) {
      alert("invalid email")
    }

    var payload = {
      "firstName": firstNameTrimmed,
      "lastName": lastNameTrimmed,
      "email:": emailTrimmed,
      "password": passwordTrimmed,
      "DOB": dobTrimmed,
      "address": addressTrimmed
    }

    axios.post(apiBasedUrl + '/register', payload).then(function(response) {
      console.log(response);
       if (response.data.code == 200) {
         console.log("registration successful");
         var loginScreen = [];
         loginScreen.push(<Login parentContext={this} />);
         var loginMessage = "Not registered yet? Go to registration";
         self.props.parentContext.setState({loginScreen: loginScreen,
                                            loginMessage: loginMessage,
                                            buttonLabel: "Register",
                                            islogin: true });
       } else if (response.data.code == 401) {
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
        <MuiThemeProvider>
          <div>
            <AppBar title="Host Register" />
            <TextField 
              hintText="First name"
              floatingLabelText="First Name"
              onChange = {(event, newValue) => this.setState({lastName: newValue})}
            />
            <br />
            <TextField 
              hintText="Last name"
              floatingLabelText="Last Name"
              onChange = {(event, newValue) => this.setState({firstName: newValue})}
            />
            <br />
            <TextField 
              hintText="Email"
              floatingLabelText="Email"
              onChange = {(event, newValue) => this.setState({email: newValue})}
            />
            <br />
            <TextField 
              hintText="Password"
              floatingLabelText="Password"
              onChange = {(event, newValue) => this.setState({password: newValue})}
            />
            <br />
            <TextField 
              hintText="Date of Birth"
              floatingLabelText="Date of Birth"
              onChange = {(event, newValue) => this.setState({DOB: newValue})}
            />
            <br />
            <TextField 
              hintText="Address"
              floatingLabelText="Address"
              onChange = {(event, newValue) => this.setState({address: newValue})}
            />
            <br />
            <RaisedButton 
              label="Submit"
              primary={true}
              style={style}
              onClick={(event) => this.registerButton(event)}
            />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default Register;