import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import CreateIcon from '@mui/icons-material/Create';
import MenuIcon from '@mui/icons-material/Menu';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import ListIcon from '@mui/icons-material/List';
import { ListItemButton, Toolbar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import MenuList from '@mui/material/MenuList';
import WineBarIcon from '@mui/icons-material/WineBar';
import PublicIcon from '@mui/icons-material/Public';

import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

function MUIMenutyypit () {

  const [open, setOpen ] = useState(false);
  const [anchorNavi, setOpenNavi] = useState(null);

  const handleOpen = () => { 
    setOpen(true); 
  }

  const handleClose = () => { 
    setOpen(false); 
  }

  const menuOpen = (e) => {
    setOpenNavi(e.currentTarget);
   };
  
   const menuClose = () => {
    setOpenNavi(null);
   }
  
  return (
    <Box>
         <AppBar position='static'>
        <Toolbar>
        <IconButton onClick={ handleOpen }><MenuIcon /></IconButton>   
<Drawer anchor='left' open={ open } onClick={ handleClose }>
<List>
  <ListItem component={Link} to='tyyppi'>
<ListItemButton>
<ListItemIcon><WineBarIcon color='primary' /></ListItemIcon>
<ListItemText primary='Hae viinityyppiä' />
</ListItemButton>
</ListItem>
<ListItem component={Link} to='maat'>
  <ListItemButton>
<ListItemIcon><PublicIcon color='primary' /></ListItemIcon>
<ListItemText primary='Selaa maittain' />
</ListItemButton>
</ListItem>

</List>
</Drawer>
</Toolbar>
</AppBar>
<Outlet/>
    </Box>

  );
}





export default MUIMenutyypit;