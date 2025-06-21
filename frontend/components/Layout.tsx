'use client'

import React, { useState } from 'react';
import { SiSpotify } from '@icons-pack/react-simple-icons';
import { ThemeProvider, createTheme } from "@mui/material/styles";

import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";

import { orange } from "@mui/material/colors";
import MenuIcon from "@mui/icons-material/Menu";
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHub from '@mui/icons-material/GitHub';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: orange
  },
});

const links = [
	{
		href: 'https://instagram.com/benfrymusic',
		child: <InstagramIcon fontSize='large'/>
	},
	{
		href: 'https://github.com/benfry128',
		child: <GitHub fontSize='large'/>
	},
	{
		href: 'https://open.spotify.com/user/31tnaej2hznzuj25tx2p2lf7p4xy',
		child: <SiSpotify size={32}/>
	},
];

function Layout({children}: {children: React.ReactNode}) {
	const [_drawerOpen, setDrawerOpen] = useState(false);

	return <ThemeProvider theme={darkTheme}>
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<CssBaseline/>
			<AppBar position='static' sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
				<Toolbar>
					<Button href='./'>Home</Button>
					<Button href='./albums'>Album Reviews</Button>
				</Toolbar>
			</AppBar>
			<main>{children}</main>
			{_drawerOpen || 
				<Fab 
					size='small' 
					color='primary' 
					sx={{
						position: 'fixed',
						bottom: 16,
						right: 16
					}}
					onClick={() => {
						setDrawerOpen(true);
					}}
				>
					<MenuIcon />
				</Fab>
			}
			<Drawer
				open={_drawerOpen}
				onClose={() => {
					setDrawerOpen(false);
				}}
				anchor='right'
			>
				{links.map((link, index) => 
					<IconButton
					key={index}
					href={link.href}
					target='_blank'
					>
					{link.child}
					</IconButton>
				)}
				<IconButton
					href='./admin'
				>
					<MenuIcon fontSize='large'/>
				</IconButton>
			</Drawer>
		</LocalizationProvider>
	</ThemeProvider>;
}
    
export default Layout;
    
