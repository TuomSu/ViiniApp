import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Viinilista from './Viinilista';

import axios from 'axios';

function HaeViinit() {

  const [viinit, setViinit] = useState([]);
  const [virhe, setVirhe] = useState('Haetaan');

  const haeKaikkiViinit = async () => {
    try {
      const response = await axios.get('http://localhost:8080/viini/all');
      setViinit(response.data);
      console.log(response.data);
      setVirhe('');
    } catch (error) {
      setViinit([]);
      setVirhe('Tietojen haku ei onnistunut');
    }
  }

  useEffect(() => {
    haeKaikkiViinit();
  }, [])

  if (virhe.length > 0) {
    return (<Typography>{virhe}</Typography>);
  }

  if (viinit.length > 0) {
    return (<Viinilista viinit={viinit} />);
  }

  return (<Typography>Yhtään matkaa ei ole</Typography>);
}

export default HaeViinit;
