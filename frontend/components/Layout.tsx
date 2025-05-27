import React, { useState } from 'react';
import { SiTwitch, SiSpotify } from '@icons-pack/react-simple-icons';
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
import YouTube from '@mui/icons-material/YouTube';

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
		href: 'https://www.youtube.com/@benjammin128',
		child: <YouTube fontSize='large'/>
	},
	{
		href: 'https://www.twitch.tv/benjammin128',
		child: <SiTwitch size={32}/>
	},
	{
		href: 'https://open.spotify.com/user/31tnaej2hznzuj25tx2p2lf7p4xy',
		child: <SiSpotify size={32}/>
	},
]

function Layout({children}: {children: React.ReactNode}) {
  const [_drawerOpen, setDrawerOpen] = useState(false);

  return <ThemeProvider theme={darkTheme}>
		<CssBaseline/>
		<AppBar position='static' sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
			<Toolbar>
				<Button href='./'>Home</Button>
				<Button href='./albums'>Request Albums</Button>
				<Button href='./db'>Listening Data</Button>
			</Toolbar>
		</AppBar>
		<main>{children}</main>
		<Fab 
			size='small' 
			color='primary' 
			sx={{
				position: 'absolute',
				bottom: 16,
				right: 16
			}}
			onClick={() => {
				setDrawerOpen(true);
			}}
		>
			<MenuIcon />
		</Fab>
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
	</ThemeProvider>;
}
    
export default Layout;
    
