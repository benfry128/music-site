'use client'

import { useState } from 'react';
import { Album } from '@/components/Globals';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { patchAlbum } from '@/app/actions';

const columns: GridColDef[] = [
	{ field: 'title', headerName: 'Title', editable: true, minWidth: 275},
	{ field: 'artist', headerName: 'Artist', editable: true, minWidth: 175},
	{ field: 'date_released', headerName: 'Released', editable: true, minWidth: 100},
	{ field: 'rating', headerName: 'Rating', editable: true, minWidth: 50},
	{ field: 'date_listened', headerName: 'Listened', editable: true, minWidth: 75},
	{ field: 'favorite_song', headerName: 'Top Song', editable: true, minWidth: 175},
	{ field: 'recommended_by', headerName: 'From', editable: true, minWidth: 75}, 
	{ field: 'ranking', headerName: 'Ranking', editable: true, minWidth: 50},
	{ field: 'queue_position', headerName: 'Queue', editable: true, minWidth: 50}
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
