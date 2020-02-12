import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import theme from '../../theme';
import axios from 'axios';

class ToggleListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isListed: false
    }
  }

  componentDidMount() {
    var self = this;
    var apiBaseUrl = "https://hpcompost.com/api/preferences";

    axios.get(apiBaseUrl + '/isListingOn?id=' + this.props.props.props).then(function(response) {
      if (response.data.success) {
        console.log(response)
        self.setState({ isListed: response.data.isListingOn })
      }
    }).catch(function(error) {
      console.log(error);
    })
  }

  render() {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={!this.state.isListed}
            onChange={(event) => {
              this.setState((prevState) => ({ isListed: !prevState.isListed }))
              console.log(this.state.isListed)
            }}
            color="primary"
          />
        }
        label="I am accepting contributions from the community."
        autoFocus
        style={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}
      />
    )
  }
}

export default ToggleListing;