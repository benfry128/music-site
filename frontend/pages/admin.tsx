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

function Index() {
    const [_password, setPassword] = useState('');
    const [_albums, setAlbums] = useState([]);

    const getAlbums = async () => {
        const response = await fetch(`${API_URL}/albums/`);
        const nums = await response.json();
        setAlbums(nums)
    }

    useEffect( () => {
        getAlbums();
    }, [])

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
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {_albums.map((album: { id: number, image_url: string, title: string, artist: string }) => <TableRow key={album.id}>
                                <TableCell>{album.id}</TableCell>
                            </TableRow>)}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </Stack>
    </Box>;
}

export default Index;
