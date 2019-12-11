import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import theme from '../theme';
import HostPreferences from './HostPreferences';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function SimpleTabs(props) {
  const [value, setValue] = React.useState(0);
  console.log(props)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Tabs value={value} 
                onChange={handleChange} 
                aria-label="simple tabs example" 
                centered
          >
            <Tab label="Messages" {...a11yProps(0)} />
            <Tab label="Preferences" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          Messages
        </TabPanel>
        <TabPanel value={value} index={1}>
          <HostPreferences props={props.location.state.id} />
          {/* <HostPreferences /> */}
        </TabPanel>
      </ThemeProvider>
    </div>
  );
}