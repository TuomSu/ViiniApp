import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Viinilista from './Viinilista';

import axios from 'axios';
import MUIHakuMaat from './MUIHakuMaat';

function HaeMaat() {

  const [viinit, setViinit] = useState([]);
  const [virhe, setVirhe] = useState('Haetaan');

  const haeYksiMaa = async () => {
    try {
      const response = await axios.get('http://localhost:8080/viini/country/:maa');
      setViinit(response.data);
      console.log(response.data);
      setVirhe('');
    } catch (error) {
      setViinit([]);
      setVirhe('Tietojen haku ei onnistunut');
    }
  }

  useEffect(() => {
    haeYksiMaa();
  }, [])

  if (virhe.length > 0) {
    return (<Typography>{virhe}</Typography>);
  }

  if (viinit.length > 0) {
    return (<MUIHakuMaat viinit={viinit} />);
  }

  return (<Typography>Kyseistä maata ei ole</Typography>);
}

export default HaeMaat;
