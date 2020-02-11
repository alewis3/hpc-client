import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../../theme';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import AllowedItems from './AllowedItems';
import ProhibitedItems from './ProhibitedItems'
import ResetPassword from './ResetPassword';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function HostPreferences(props) {
  const classes = useStyles();
  const [isListed, setIsListed] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <h1 style={{fontFamily: 'arial, sans-serif'}}>Welcome back to HPC!</h1>
        <FormControlLabel
          control={
            <Checkbox
              checked={isListed}
              onChange={() => setIsListed(!isListed)}
              color="primary"
            />
          }
          label="I am accepting contributions from the community."
          autoFocus
          style={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}
        />
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <h4>Prohibited Items</h4>
              <ProhibitedItems props={props} />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <h4>Allowed Items</h4>
              <AllowedItems props={props} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <h4>Reset Password</h4>
              <ResetPassword props={props} />
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