import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Viinilista from './Viinilista';

import axios from 'axios';
import MUIHaku from './MUIHaku';

function HaeTyypit() {

  const [viinit, setViinit] = useState([]);
  const [virhe, setVirhe] = useState('Haetaan');

  const haeYksiTyyppi = async () => {
    try {
      const response = await axios.get('http://localhost:8080/type/:tyyppi');
      setViinit(response.data);
      console.log(response.data);
      setVirhe('');
    } catch (error) {
      setViinit([]);
      setVirhe('Tietojen haku ei onnistunut');
    }
  }

  useEffect(() => {
    haeYksiTyyppi();
  }, [])

  if (virhe.length > 0) {
    return (<Typography>{virhe}</Typography>);
  }

  if (viinit.length > 0) {
    return (<Viinilista viinit={viinit} />);
  }

  return (<Typography>Kyseistä viinityyppiä ei ole</Typography>);
}

export default HaeTyypit;
