import React, { useState} from 'react';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import DeleteIcon from '@mui/icons-material/Delete';

import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import CloseIcon from '@mui/icons-material/Close';

import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import AssignmentIcon from '@mui/icons-material/Assignment';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import HaeViinit from './HaeViinit';

const tyypit = ["", 'punaviini', 'valkoviini', 'kuohuviini', 'roseviini']

function Viinilista (props){

  const [viesti, setViesti] = useState('');
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  }

  const poista = async (id) => {
    try {
      await axios.get('http://localhost:8080/viini/delete/' + id)
      setViesti('Poistettiin');
    } catch (error) {
      setViesti('Poisto ei onnistunut');
    }
    setOpen(true);
  }
  let dialog =   
  <Dialog onClick={handleClose} open={open}>
    <DialogContent>
      <DialogContentText color='secondary'>{viesti}
      <IconButton onClick={handleClose}>
        <CloseIcon />
      </IconButton>
      </DialogContentText>
    </DialogContent>
  </Dialog>;

if (viesti === 'Poistettiin') {
  return ( 
    <div>
      { dialog }
      <HaeViinit />
    </div> 
  )
}
if (props.viinit.length > 0) {
return(
    <Grid container spacing={ 4 } >
        {
            props.viinit.map(viini => {
                return (
                <Grid item key={viini.id} >
                <Card sx={{background: 'lightblue', padding:'17px', radius: '10px', variant: 'outlined'}}>
                <CardContent sx={{ justifyContent: 'center', gap: 1 }}>  
                <CardHeader sx={{background: 'white'}} title= {viini.nimi} /> 
                <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: deepPurple[500] }}>M</Avatar> 
                  </ListItemAvatar>
                  <ListItemText primary="Maa" secondary= {viini.maa} />
                  </ListItem>
                  <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: deepPurple[500] }}>V</Avatar> 
                  </ListItemAvatar>
                  <ListItemText primary="Vuosi" secondary= {viini.vuosi} />
                  </ListItem>
                  <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: deepPurple[500] }}>T</Avatar> 
                  </ListItemAvatar>
                  <ListItemText primary="Tyyppi" secondary= {tyypit[viini.tyyppi]} />
                  </ListItem>
                  <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: deepPurple[500] }}>R</Avatar> 
                  </ListItemAvatar>
                  <ListItemText primary="Rypäleet" secondary= {viini.rypaleet} />
                  </ListItem>
                  <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: deepPurple[500] }}>%</Avatar> 
                  </ListItemAvatar>
                  <ListItemText primary="Alkoholi" secondary= {viini.alkoholi} />
                  </ListItem>
                  <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: deepPurple[500] }}>€</Avatar> 
                  </ListItemAvatar>
                  <ListItemText primary="Hinta" secondary= {viini.hinta} />
                  </ListItem>
                  <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: deepPurple[500] }}><AssignmentIcon/></Avatar> 
                  </ListItemAvatar>
                  <ListItemText primary="Kuvaus" secondary= {viini.kuvaus} />
                  </ListItem>
                  <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: deepPurple[500] }}><StarBorderIcon/></Avatar> 
                  </ListItemAvatar>
                  <ListItemText primary="Arvostelu" secondary= {viini.arvostelu} />
                  </ListItem>
                
                </List>
                <Box> 
                  {viini.kuva ?
        <CardMedia component='img' sx={{borderRadius:2 }} width={210} height={200} image={'http://localhost:8080/download/' + viini.kuva}alt={ viini.nimi } />
                :
                <Typography sx={ {height: 100, width: 200} }>Ei kuvaa</Typography> 
                }
        </Box>
        <CardActions>
        <IconButton color='primary'  component={ Link } to={ '/muokkaa/' + viini.id + '/' + encodeURI(viini.nimi) + 
            '/' + viini.maa + '/' + viini.vuosi + '/' + viini.tyyppi + '/' + encodeURI(viini.rypaleet) + '/' + viini.alkoholi + '/' + viini.hinta + '/' +encodeURI(viini.kuvaus) + '/' + viini.arvostelu}><EditIcon />Muokkaa</IconButton>
        <IconButton color='secondary' onClick={() => poista(viini.id)}><DeleteIcon />Poista</IconButton>
        </CardActions>
        </CardContent>

      
      </Card> 
          </Grid>
        )
      })
    }
    </Grid>
  )    
}
return ( <Typography>Yhtään viiniä ei ole</Typography> );
}

export default Viinilista;