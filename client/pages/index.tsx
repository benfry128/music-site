import React, {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import { Toolbar } from '@mui/material';

function index() {
  useEffect(() => {
    // fetch('http://localhost:8080/tracks/200')
    //   .then(
    //   data => {
    //     console.log(data.json());
    //   }
    // );
  }, []);
  
  return (
    <AppBar position='static'>
      <Toolbar>
        <Button>
          Home
        </Button>
        <Button>
          Request Albums
        </Button>
        <Button>
          Amorogs
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default index;
