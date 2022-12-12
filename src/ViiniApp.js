import React from 'react';

import ViinitNavigaatio from './components/ViinitNavigaatio';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import {lightBlue, amber, red} from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';

import MUIHakuMaat from './components/MUIHakuMaat';
import MUIHaku from './components/MUIHaku';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import EDITViinilomake from './components/EDITViinilomake';
import HaeViinit from './components/HaeViinit';
import MUIViinilomake from './components/MUIViinilomake';


const theme = createTheme({
    palette: {
        primary: {main: lightBlue[500], contrastText: '#FFFFFF'}, 
            secondary: {main: red[300], contrastText: '#FFFFFF'}, 
            text: {primary: lightBlue[500], secondary: '#000000', contrastText: '#FFFFFF'},
        },
    typography: {
    fontFamily: "'Poppins', 'sans-serif'"
    }, 
    background: {default: '#FFFFFF'}
    });





function ViiniApp(){
    return(
        <div>
            <ThemeProvider theme={ theme }>
        <CssBaseline /> 
           <BrowserRouter>
        <Routes>
            <Route path='/' element={ <ViinitNavigaatio  /> }>
                <Route index element={  <Typography> Tervetuloa Viinien Arvostelusovellukseen! </Typography>} />
                <Route path='listaa' element={ <HaeViinit/> } />
                <Route path='lisaa' element={ <MUIViinilomake /> } />
                <Route path='haetyyppi' element={ <MUIHaku /> } />
                <Route path='haemaa' element={ <MUIHakuMaat /> } />
                <Route path='muokkaa/:id/:nimi/:maa/:vuosi/:tyyppi/:rypaleet/:alkoholi/:hinta/:kuvaus/:arvostelu' element={< EDITViinilomake />} />
                <Route path='*' element={ <Typography> Väärä reititys </Typography> }/>
                
            </Route>
        
        </Routes> 
</BrowserRouter>
           </ThemeProvider>
        </div>
    )
}

export default ViiniApp;