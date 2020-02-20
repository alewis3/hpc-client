import React, { Component } from 'react';
import axios from 'axios';
import theme from '../../theme';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

class Blacklist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dense: false,
      secondary: false
    }
  }

  componentDidMount() {
    var self = this;
    var apiBaseUrl = "https://hpcompost.com/api";
  }

  generate(element) {
    // update array to response from componentDidMount
    return [0, 1, 2].map(value =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }

  // will likely need to recall generate to update list
  async removeUser(event) {
    console.log("yoyoyo")
  }

  render() {
    return (
      <div className={style.demo}>
        <List dense={this.state.dense}>
          {this.generate(
            <ListItem>
              <ListItemText
                primary="BAD USER"
              />
              <ListItemSecondaryAction
                onClick={(event) => this.removeUser(event)}
              >
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
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