import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CreateIcon from '@mui/icons-material/Create';
import ListIcon from '@mui/icons-material/List';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import WineBarIcon from '@mui/icons-material/WineBar';

import PublicIcon from '@mui/icons-material/Public';
import { Link, Outlet } from 'react-router-dom';

function ViinitNavigaatio () {

  const [value, setValue] = useState(0);

  const handleChange = (e, val) => {
    setValue(val);
  }
  
  
  return (
  <Box>
    <AppBar position='static'>
      <Toolbar>
  <Tabs value={ value } onChange={ handleChange } variant= 'fullWidth' centered 
  sx={{flexGrow:1, textAlign:'center'}} textColor='inherit' indicatorColor='secondary'>
    <Tab label='Kaikki viinit' icon={<ListIcon />} component={ Link } to='listaa' />
    <Tab label='Lisää viiniarvostelu' icon={<CreateIcon />} component={ Link } to='lisaa' />
    <Tab label='Hae viinejä tyypeittäin' icon={<WineBarIcon />} component={ Link } to='haetyyppi'/>
    <Tab label='Hae viinejä maittain' icon={<PublicIcon />} component={ Link } to='haemaa'/>
  </Tabs>
  </Toolbar>
  </AppBar>
  
  
  <Outlet />
  </Box>
  );
}
export default ViinitNavigaatio;