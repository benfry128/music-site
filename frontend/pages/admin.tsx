import { useEffect, useState } from 'react';
import { API_URL } from '@/components/Globals';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

interface Album {
    id: number; 
    title: string;
    artist: string;
    date_released: number;
    rating: number;
    date_listened: number;
    favorite_song: string;
    recommended_by: string;
    ranking: number; 
    queue_position: number
}

function Index() {
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

    if (_albums[0]) {
        console.log(_albums[0].date_released);
    }

    return <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
        <Stack direction="column" alignItems='center' spacing={3}>
            <Typography variant='h3'>
                Admin
            </Typography>
            <TextField
                label='Enter password'
                value={_password}
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
            {_password === 'amorgos' &&
                <TableContainer component={Paper}>
                    <Table size='small'>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Artist</TableCell>
                                <TableCell>Released</TableCell>
                                <TableCell>Rating</TableCell>
                                <TableCell>Listened</TableCell>
                                <TableCell>Top Song</TableCell>
                                <TableCell>Recommended By</TableCell>
                                <TableCell>Ranking</TableCell>
                                <TableCell>Queue Position</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {_albums.map((album: Album) => <TableRow key={album.id}>
                                <TableCell>{album.id}</TableCell>
                                <TableCell>{album.title}</TableCell>
                                <TableCell>{album.artist}</TableCell>
                                <TableCell>{album.date_released?.toString()}</TableCell>
                                <TableCell>{album.rating}</TableCell>
                                <TableCell>{album.date_listened?.toString()}</TableCell>
                                <TableCell>{album.favorite_song}</TableCell>
                                <TableCell>{album.recommended_by}</TableCell>
                                <TableCell>{album.ranking}</TableCell>
                                <TableCell>{album.queue_position}</TableCell>
                            </TableRow>)}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </Stack>
    </Box>;
}

export default Index;
