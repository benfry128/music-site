import React from 'react';
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
    <AppBar position='static' sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <Toolbar>
      <Button href='./'>
        Home
      </Button>
      <Button href='./albums'>
        Request Albums
      </Button>
      <Button href='./db'>
        Listening Data
      </Button>
      </Toolbar>
    </AppBar>
    <main>{children}</main>
  </ThemeProvider>;
}
    
export default Layout;
    
