import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import theme from '../../theme';

class ListingAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        address: '',
        city: '',
        state: '',
        zip: 0
      }
    }
  }

  // will need 
  // componentDidMount() {

  // }

  udpate(event) {

  }

  handleZipChange = (event) => {
    const inputZip = event.target.value;
    this.setState(prev => ({ location: { ...prev.location, zip: inputZip } }))
  }

  handleAddress = (event) => {
    const inputAddress = event.target.value;
    this.setState(prev => ({ location: { ...prev.location, address: inputAddress } }))
  }

  handleCity = (event) => {
    const inputCity = event.target.value;
    this.setState(prev => ({ location: { ...prev.location, city: inputCity } }))
  }

  handleState = (event) => {
    const inputState = event.target.value;
    this.setState(prev => ({ location: { ...prev.location, state: inputState } }))
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <TextField
          autoFocus
          label="Street Address"
          fullWidth
          style={{ margin: 16 }}
          onChange={this.handleAddress}
        />
        <TextField
          autoFocus
          label="City"
          style={{ margin: 5 }}
          onChange={this.handleCity}
        />
        <TextField
          autoFocus
          label="State"
          style={{ margin: 5 }}
          onChange={this.handleState}
        />
        <TextField
          autoFocus
          label="Zip Code"
          type="number"
          style={{ margin: 5 }}
          onChange={this.handleZipChange}
        />
        <br />
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={(event) => this.udpate(event)}
        >Update Listing Address</Button>
      </ThemeProvider>
    )
  }
}

export default ListingAddress;