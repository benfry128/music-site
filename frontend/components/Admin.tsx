'use client'

import { useEffect, useState } from 'react';
import { API_URL, Album} from '@/components/Globals';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
	{ field: 'title', headerName: 'Title'},
	{ field: 'artist', headerName: 'Artist'},
	{ field: 'date_released', headerName: 'Released'},
	{ field: 'rating', headerName: 'Rating'},
	{ field: 'date_listened', headerName: 'Listened'},
	{ field: 'favorite_song', headerName: 'Top Song'},
	{ field: 'recommended_by', headerName: 'From'},
	{ field: 'ranking', headerName: 'Ranking'},
	{ field: 'queue_position', headerName: 'Queue'}
];

export default function Admin() {
    const [_password, setPassword] = useState('');
    const [_albums, setAlbums] = useState<Album[]>([]);

    const getAlbums = async () => {
        const response = await fetch(`${API_URL}/albums/`);
        const nums : { albums: Album[]} = await response.json();
        setAlbums(nums.albums);
    }

    useEffect( () => {
        getAlbums();
    }, [])

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
					rows={_albums}
					columns={columns}
				>
				</DataGrid>
            }
        </Stack>
    </Box>;
}
