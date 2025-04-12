import React, {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import { Toolbar } from '@mui/material';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { orange } from "@mui/material/colors";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: orange
  },
});

function Layout({children}: {children: React.ReactNode}) {
  return <ThemeProvider theme={darkTheme}>
    <CssBaseline/>
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
    <main>{children}</main>
  </ThemeProvider>;
}
    
export default Layout;
    
