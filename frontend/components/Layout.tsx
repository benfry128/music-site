'use client'

import React, { useState } from 'react';
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import { LocalizationProvider } from '@mui/x-date-pickers';
import {SvgIcon} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";

import { orange } from "@mui/material/colors";
import styles from './Layout.module.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: orange
  },
});

const links = [
	{
		href: 'https://instagram.com/benfrymusic',
        child: <SvgIcon fontSize='large'><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" /></SvgIcon>
	},
	{
		href: 'https://github.com/benfry128',
		child: <SvgIcon fontSize='large'><path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" /></SvgIcon>
    },
	{
		href: 'https://open.spotify.com/user/31tnaej2hznzuj25tx2p2lf7p4xy',
		child: <SvgIcon fontSize='large'><path d="M17.9,10.9C14.7,9 9.35,8.8 6.3,9.75C5.8,9.9 5.3,9.6 5.15,9.15C5,8.65 5.3,8.15 5.75,8C9.3,6.95 15.15,7.15 18.85,9.35C19.3,9.6 19.45,10.2 19.2,10.65C18.95,11 18.35,11.15 17.9,10.9M17.8,13.7C17.55,14.05 17.1,14.2 16.75,13.95C14.05,12.3 9.95,11.8 6.8,12.8C6.4,12.9 5.95,12.7 5.85,12.3C5.75,11.9 5.95,11.45 6.35,11.35C10,10.25 14.5,10.8 17.6,12.7C17.9,12.85 18.05,13.35 17.8,13.7M16.6,16.45C16.4,16.75 16.05,16.85 15.75,16.65C13.4,15.2 10.45,14.9 6.95,15.7C6.6,15.8 6.3,15.55 6.2,15.25C6.1,14.9 6.35,14.6 6.65,14.5C10.45,13.65 13.75,14 16.35,15.6C16.7,15.75 16.75,16.15 16.6,16.45M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></SvgIcon>
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
                    <div className={styles.bigOnly}>
                        <Button href='./db' className={styles.bigOnly}>Database</Button>
                    </div>
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
					<SvgIcon><path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" /></SvgIcon>
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
			</Drawer>
		</LocalizationProvider>
	</ThemeProvider>;
}
    
export default Layout;
    
