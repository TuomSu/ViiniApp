import React, {useState} from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { MenuItem } from '@mui/material';

import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import AssignmentIcon from '@mui/icons-material/Assignment';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const tyypit = ["", 'punaviini', 'valkoviini', 'kuohuviini', 'roseviini']

function MUIHaku (){
    const [tyyppi, setTyyppi] = useState('');
    const [virhe, setVirhe] = useState('');
    const [viinit, setViinit] = useState([]);

    const muuta = (e) => {
        setTyyppi(e.target.value);
    };

    const haeYksiTyyppi = async () => {
        try {
          const response = await axios.get('http://localhost:8080/viini/type/' +tyyppi);
          setViinit(response.data);
          console.log(response.data);
          setVirhe('');
        } catch (error) {
          setViinit([]);
          setVirhe('Tietojen haku ei onnistunut');
        }
    };

    const tyyppeja = [
      { arvo: 1, teksti: 'punaviini' },
      { arvo: 2, teksti: 'valkoviini'},
      { arvo: 3, teksti: 'kuohuviini'},
      { arvo: 4, teksti: 'roseviini'},
      ];
    return(
      <Box>
        <Box component='form' sx={ {'& .MuiTextField-root': { marginBottom: 2 }, padding: 2} }>
            
            <TextField name='tyyppi' label='Tyyppi' variant='outlined' fullWidth value={ tyyppi.tyyppi }  onChange={ (e) => muuta(e) } select>
            { 
                tyyppeja.map((tyyppi) => (
                <MenuItem key={ tyyppi.arvo } value={ tyyppi.arvo }>{ tyyppi.teksti }</MenuItem>
                ))
                }
                
                </TextField>
                <Button variant= 'outlined' sx={{marginTop: '0.2cm', backgroundColor:'yellow', color:'black', borderRadius: '6px'}} onClick={ () => haeYksiTyyppi() }> Hae </Button>
        </Box>
    {viinit.length > 0 ?  
            <Grid container spacing={ 4 } >
                {  
            viinit.map(viini =>{
                return(
                    <Grid item key={viini.id}>
                    <Card sx={{background: 'lightblue', padding:'17px', radius: '10px', variant: 'outlined'}}>
                    <CardContent sx={{ justifyContent: 'center', gap: 1 }}>
                    <CardHeader sx={{background: 'white'}} title={viini.nimi}/>
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
        </CardContent>
        </Card> 
          </Grid>
                    
                  )
            })
          }
          </Grid>
          : 
          <Box>{virhe}</Box>
        }
          </Box>
        )    
        }
        
    
export default MUIHaku;