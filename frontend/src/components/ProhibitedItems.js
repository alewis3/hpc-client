import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import theme from '../theme';
import { makeStyles } from '@material-ui/core/styles';

export default function ProhibitedItems() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <TextField
        id="outlined-multiline-static"
        multiline
        rows="10"
        placeholder="List prohibted items or any other notes about your composting bin"
        className={classes.textField}
        margin="normal"
        variant="outlined"
      />
      <br />
      <br />
      <Button
        variant="contained"
        color="primary"
      >Save</Button>
    </ThemeProvider>
  )
}

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 500,
  },
}));

