import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';
import theme from '../../theme';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class Blacklist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dense: false,
      secondary: false
    }
  }

  componentDidMount() {
    // fetch blacklisted users
  }

  generate(element) {
    return [0, 1, 2].map(value =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }

  render() {
    return (
      <div className={style.demo}>
        <List dense={this.state.dense}>
          {this.generate(
            <ListItem>
              <ListItemText
                primary="Single-line item"
                secondary={this.state.secondary ? 'Secondary text' : null}
              />
            </ListItem>,
          )}
        </List>
      </div>
    )
  }
}

const style = {
  margin: 30,
  title: {
    flexGrow: 1
  },
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
};

export default Blacklist;