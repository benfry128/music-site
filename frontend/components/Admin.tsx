'use client'

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Album } from '@/components/Globals';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { patchAlbum } from '@/app/actions';
import { useState } from 'react';

const columns: GridColDef[] = [
	{ field: 'title', headerName: 'Title', type: 'string', editable: true, minWidth: 275},
	{ field: 'artist', headerName: 'Artist', type: 'string', editable: true, minWidth: 175},
	{ field: 'date_released', headerName: 'Released', type: 'date', editable: true, minWidth: 100},
	{ field: 'rating', headerName: 'Rating', type: 'number', editable: true, minWidth: 50},
	{ field: 'date_listened', headerName: 'Listened', type: 'date', editable: true, minWidth: 75},
	{ field: 'favorite_song', headerName: 'Top Song', type: 'string', editable: true, minWidth: 175},
	{ field: 'recommended_by', headerName: 'From', type: 'string', editable: true, minWidth: 75}, 
	{ field: 'ranking', headerName: 'Ranking', type: 'number', editable: true, minWidth: 50},
	{ field: 'queue_position', headerName: 'Queue', type: 'number', editable: true, minWidth: 50}
];

export default function Admin( {albums} : { albums: Album[] }) {
    const [_password, setPassword] = useState('');

    return <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
        <Stack direction="column" alignItems='center' spacing={3}>
            <Typography variant='h3'>
                Admin
            </Typography>
            {_password !== 'amorgos' ?
                <TextField
                    label='Enter password'
                    value={_password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
				: <DataGrid
					rows={albums}
					columns={columns}
                    showToolbar
                    processRowUpdate={ async (updatedRow: Album, originalRow: Album) => {
                        const patchError = await patchAlbum(updatedRow);
                        if (patchError) {
                            return originalRow;
                        }
                        return updatedRow;
                    }}
				>
				</DataGrid>
            }
        </Stack>
    </Box>;
}
