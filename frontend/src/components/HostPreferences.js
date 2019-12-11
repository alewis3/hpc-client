import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { AppBar, Button } from '@material-ui/core';
import theme from '../theme';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import AllowedItems from './AllowedItems';
import ProhibitedItems from './ProhibitedItems'
import ResetPassword from './ResetPassword';

export default function HostPreferences(props) {
  const classes = useStyles();
  
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <h4>Prohibited Items</h4>
              {/* <ProhibitedItems props={this.props} /> */}
              <ProhibitedItems />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <h4>Allowed Items</h4>
              {/* <AllowedItems props={this.props} /> */}
              <AllowedItems />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <h4>Reset Password</h4>
              {/* <ResetPassword props={this.props} /> */}
              <ResetPassword />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  )
}

const useStyles = makeStyles(style => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: style.spacing(2),
    textAlign: 'center'
  },
}));