import React, {useState} from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import AttachmentIcon from '@mui/icons-material/Attachment';
import Input from '@mui/material/Input';

import { MenuItem } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import axios from 'axios';

import { Route, Routes, useNavigate } from 'react-router-dom';
import HaeViinit from './HaeViinit';

  
function MUIViinilomake() {

    const [lomake, setLomake] = useState( {nimi: '', maa: '', vuosi: '', tyyppi:'', rypaleet:'', alkoholi:'', hinta:'', kuvaus:'', arvostelu: 3, kuva:[]});
    
    const [viesti, setViesti] = useState('');
    
    const valuetext = (value) => {
        return {value};
    }

    let kuvaNimi = '';
    if (lomake.kuva !== null) {
      kuvaNimi = lomake.kuva.name;
    }

    const lisaa = async (e) => {
        const formData = new FormData();
        formData.append('nimi', lomake.nimi);
        formData.append('maa', lomake.maa);
        formData.append('vuosi', lomake.vuosi); 
        formData.append('tyyppi', lomake.tyyppi); 
        formData.append('rypaleet', lomake.rypaleet);
        formData.append('alkoholi', lomake.alkoholi); 
        formData.append('hinta', lomake.hinta); 
        formData.append('kuvaus', lomake.kuvaus); 
        formData.append('arvostelu', lomake.arvostelu);
        formData.append('kuva', lomake.kuva);
        try{
        await axios.post('http://localhost:8080/viini/add', formData);    
        setLomake({
            nimi: '', 
            maa: '', 
            vuosi: '', 
            tyyppi:'', 
            rypaleet:'', 
            alkoholi:'', 
            hinta:'', 
            kuvaus:'', 
            arvostelu: '', 
            kuva: []
        });
        }catch (error){
            setLomake({
                nimi: '', 
                maa: '', 
                vuosi: '', 
                tyyppi:'', 
                rypaleet:'', 
                alkoholi:'', 
                hinta:'', 
                kuvaus:'', 
                arvostelu: '', 
                kuva: []
            });
            setViesti('Tietojen lisäys ei onnistunut');
        }
        setViesti('Lisättiin');
        
    }

    const navigate = useNavigate();

    const redirectToWinelist = () =>{
        navigate('/listaa');
    };

    const muuta = (e) => {
        setLomake({
          ...lomake,
          [e.target.name]: e.target.value
        });
    }

    const muutaKuva = (e) => {
        setLomake({
          ...lomake,
          kuva: e.target.files[0]
        });
    }

    const tyhjenna = (e) => {
        setLomake({
            nimi: '', 
            maa: '', 
            vuosi: '', 
            tyyppi:'', 
            rypaleet:'', 
            alkoholi:'', 
            hinta:'', 
            kuvaus:'', 
            arvostelu: '', 
            kuva: []
        });
        setViesti('');
  }

    const marks = [
        { value: 0, label: '0'},
        { value: 1, label: '1'},
        { value: 2, label: '2'}, 
        { value: 3, label: '3'},
        { value: 4, label: '4'},
        { value: 5, label: '5'},
    ];

    const tyypit = [
        { arvo: 1, teksti: 'punaviini' },
        { arvo: 2, teksti: 'valkoviini'},
        { arvo: 3, teksti: 'kuohuviini'},
        { arvo: 4, teksti: 'roseviini'},
        ];

    return (
    <Paper>
         <Box
        component='form'
        sx={ {'& .MuiTextField-root': { marginBottom: 2 }, padding: 2} }>

            <TextField name='nimi' label='Nimi' validations={["required"]} variant='outlined' fullWidth value={ lomake.nimi }  onChange={ (e) => muuta(e) }/>
            <TextField name='maa' label='Maa' variant='outlined' validations={["required"]} fullWidth value={ lomake.maa }  onChange={ (e) => muuta(e) }/>
            <TextField name='vuosi' label='Vuosi' variant='outlined' validations={["required", "min:1900", "max:2022"]} fullWidth value={ lomake.vuosi }  onChange={ (e) => muuta(e) }/>
            
            <TextField name='tyyppi' label="Valitse viinityyppi" variant='outlined' validations={["required"]} fullWidth value={ lomake.tyyppi }  onChange={ (e) => muuta(e) } select>
            { 
                tyypit.map((tyyppi) => (
                <MenuItem key={ tyyppi.arvo } value={ tyyppi.arvo }>{ tyyppi.teksti }</MenuItem>
                ))
                }
                
                </TextField> 
            
            <TextField name='rypaleet' label='Rypäleet' variant='outlined' fullWidth value={ lomake.rypaleet }  onChange={ (e) => muuta(e) }/>
            <TextField name='alkoholi' label='Alkoholi %' variant='outlined' fullWidth value={ lomake.alkoholi }  onChange={ (e) => muuta(e) }/>
            <TextField name='hinta' label='Hinta €' variant='outlined' fullWidth value={ lomake.hinta }  onChange={ (e) => muuta(e) }/>
            <TextField name='kuvaus' label='Kuvaus' variant='outlined' fullWidth value={ lomake.kuvaus }  onChange={ (e) => muuta(e) }/>
            
            <Typography sx={ {marginTop:1} }>Arvostelu</Typography>
            <Slider
                name='arvostelu'
                valueLabelDisplay='auto'
                getAriaValueText={valuetext}
                step={ 0.25 }
                defaultValue={ 2 }
                min={ 0 }
                max={ 5 }
                marks={ marks } 
                value= { lomake.arvostelu }
                onChange={ (e) => muuta(e) }
            />

            

            <Input accept='image/*' name='kuva' id='kuva' type='file'
        onChange={ (e) => muutaKuva(e) } sx={{display: 'none'}} />

      <InputLabel htmlFor='kuva'>
        <Typography sx={{ display:'inline'}}>Kuva</Typography>
        <Button component='span'>
            <AttachmentIcon />
        </Button>
        <Typography display='inline'>{ kuvaNimi }</Typography>
        </InputLabel>
          
            <Button variant='outlined'  sx={ {marginRight: 2} } onClick={ () => {lisaa(); redirectToWinelist()}}>Lisää</Button>
            <Button variant='outlined' color='secondary'onClick={ (e) => tyhjenna(e) } startIcon={ <ClearIcon /> }>Tyhjennä</Button>
            <Routes>
          <Route path="/listaa" element={<HaeViinit />} />
        </Routes>
        </Box>
    </Paper>
    ) 
}
export default MUIViinilomake;