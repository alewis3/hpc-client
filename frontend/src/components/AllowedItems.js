import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import theme from '../theme';
import { makeStyles } from '@material-ui/core/styles';

export default function AllowedItems() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <TextField
        id="outlined-multiline-static"
        label="Multiline"
        multiline
        rows="10"
        className={classes.textField}
        placeholder="List all allowed items or any other notes about your composting bin"
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
