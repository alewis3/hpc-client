import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Map from './components/Map';
import { MuiThemeProvider } from 'material-ui/styles';
import RaisedButton from 'material-ui/RaisedButton';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/index">
              <h3>Host, Post, and Compost</h3>
              <p>Welcome to HPC</p>
	      <ButtonSpaceForLogin />
	      <br />
	      <ButtonSpaceForRegister />
            </Route>
            <Route path="/login">
              <Login />
              <ButtonSpaceForLogin />
            </Route>
            <Route path="/register">
              <Register />
              <ButtonSpaceForRegister />
            </Route>
            <Route path="/map" component={ Map } />
          </Switch>
        </Router>
      </div>
    )
  }
}

function ButtonSpaceForLogin() {
  return(
    <div>
      <p>Don't have an account? Register here.</p>
      <Link to="/register">
        <MuiThemeProvider>
          <RaisedButton label="Register" primary={true} />
        </MuiThemeProvider>
      </Link>
      <br />
    </div>
  );
}

function ButtonSpaceForRegister() {
  return(
    <div>
      <p>Already have an account? Login here.</p>
      <Link to="/login">
        <MuiThemeProvider>
          <RaisedButton label="Login" primary={true} />
        </MuiThemeProvider>
      </Link>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default App;
