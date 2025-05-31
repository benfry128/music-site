import { useEffect, useState } from 'react';
import { API_URL } from '@/components/Globals';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
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

// from https://mui.com/material-ui/react-table/
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

interface HeadCell {
  id: keyof Album;
  label: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'title',
    label: 'Title',
  },
  {
    id: 'artist',
    label: 'Artist',
  },
  {
    id: 'date_released',
    label: 'Released',
  },
  {
    id: 'rating',
    label: 'Rating',
  },
  {
    id: 'date_listened',
    label: 'Listened',
  },
];

function Index() {
    const [_password, setPassword] = useState('');
    const [_albums, setAlbums] = useState<Album[]>([]);
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<keyof Album>('title');

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
                : <TableContainer>
                    <Table size={'small'}>
                        <TableHead>
                            <TableRow>
                                {headCells.map((headCell) => <TableCell key={headCell.id} >
                                    <TableSortLabel
                                        active={orderBy === headCell.id}
                                        direction={orderBy === headCell.id ? order : 'asc'}
                                        onClick={() => {
                                            const isAsc = orderBy === headCell.id && order === 'asc';
                                            setOrder(isAsc ? 'desc' : 'asc');
                                            setOrderBy(headCell.id);
                                        }}
                                    >
                                        {headCell.label}
                                    </TableSortLabel>
                                </TableCell>
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {_albums.sort(order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy)).map((row) => 
                                <TableRow key={row.id}>
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell>{row.artist}</TableCell>
                                    <TableCell>{row.date_released}</TableCell>
                                    <TableCell align='center'>{row.rating}</TableCell>
                                    <TableCell>{row.date_listened}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                //                 <TableCell>ID</TableCell>
                //                 <TableCell>Title</TableCell>
                //                 <TableCell>Artist</TableCell>
                //                 <TableCell>Released</TableCell>
                //                 <TableCell>Rating</TableCell>
                //                 <TableCell>Listened</TableCell>
                //                 <TableCell>Top Song</TableCell>
                //                 <TableCell>Recommended By</TableCell>
                //                 <TableCell>Ranking</TableCell>
                //                 <TableCell>Queue Position</TableCell>
            }
        </Stack>
    </Box>;
}

export default Index;
