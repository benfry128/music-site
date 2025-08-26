'use client'

import {
    DataGrid,
    GridColDef,
    GridComparatorFn,
    gridNumberComparator,
    gridDateComparator,
    GridSortDirection
} from '@mui/x-data-grid';
import { Album } from '@/components/Globals';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { patchAlbum, postAlbum } from '@/app/actions';
import React, { useState } from 'react';
import Spotify from './Spotify';
import { SimplifiedAlbum } from '@spotify/web-api-ts-sdk';
import styles from './DB.module.css';

function generateNonNullComparator(comparator: GridComparatorFn): (sortDirection: GridSortDirection) => GridComparatorFn {
    return function(sortDirection) {
        const modifier = sortDirection === 'desc' ? -1 : 1;
        return (value1, value2, cellParams1, cellParams2) => {
            if (value1 === null) {
                return 1;
            }
            if (value2 === null) {
                return -1;
            }
            return (
                modifier *
                comparator(value1, value2, cellParams1, cellParams2)
            );
        };
    }
}


export default function DB( {albums} : { albums: Album[] }) {
    const [_password, setPassword] = useState('');
    const [_reviewDialogOpen, setReviewDialogOpen] = useState(false);
    const [_spAlbum, setSpAlbum] = useState<SimplifiedAlbum | null>(null);

    function closeDialogs() {
        setSpAlbum(null);
        setReviewDialogOpen(false);
    }

    const correctPassword = _password === process.env.NEXT_PUBLIC_ADMIN_PW;

    const columns: GridColDef[] = [
        { field: 'title', headerName: 'Title', type: 'string', editable: correctPassword, minWidth: 275},
        { field: 'artist', headerName: 'Artist', type: 'string', editable: correctPassword, minWidth: 175},
        { field: 'date_released', headerName: 'Released', type: 'date', editable: correctPassword, minWidth: 100},
        { field: 'rating', headerName: 'Rating', type: 'number', editable: correctPassword, minWidth: 50, getSortComparator: generateNonNullComparator(gridNumberComparator)},
        { field: 'date_listened', headerName: 'Listened', type: 'date', editable: correctPassword, minWidth: 75, getSortComparator: generateNonNullComparator(gridDateComparator)},
        { field: 'favorite_song', headerName: 'Top Song', type: 'string', editable: correctPassword, minWidth: 175},
        { field: 'ranking', headerName: 'Ranking', type: 'number', editable: correctPassword, minWidth: 50, getSortComparator: generateNonNullComparator(gridNumberComparator)},
        { field: 'queue_position', headerName: 'Queue', type: 'number', editable: correctPassword, minWidth: 50, getSortComparator: generateNonNullComparator(gridNumberComparator)}
    ];

    return <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
        <div className={styles.bigOnly}>
            <Stack direction="column" alignItems='center' spacing={3}>
                <Typography align='center' variant='h3'>Albums Database</Typography>
                <Typography align='center'>This is the full database of albums I&#39;ve reviewed or plan to review in the future. Take a look!</Typography>
                <DataGrid
                    rows={albums}
                    columns={columns}
                    showToolbar
                    processRowUpdate={async (updatedRow: Album, originalRow: Album) => {
                        const patchError = await patchAlbum(updatedRow);
                        if (patchError) {
                            return originalRow;
                        }
                        return updatedRow;
                    }}
                    initialState={{
                        sorting: {
                            sortModel: [{field: 'title', sort: 'asc'}]
                        },
                        pagination: {
                            paginationModel: {pageSize: 25, page: 0},
                        },
                    }}
                />
                {correctPassword ?
                    <Button variant='outlined' onClick={() => setReviewDialogOpen(true)}>Review Album</Button>
                    : <TextField
                        type='password'
                        label='Enter password'
                        value={_password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                }
                <br/>
            </Stack>
            <Dialog
                onClose={closeDialogs}
                open={_reviewDialogOpen}
                slotProps={{
                    paper: {
                        component: 'form',
                        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(formData.entries());
                            if (_spAlbum) {
                                const album = {
                                    ...formJson,
                                    title: _spAlbum.name,
                                    artist: _spAlbum.artists[0].name,
                                    date_released: _spAlbum.release_date + (_spAlbum.release_date_precision !== 'day' ? '-01' : '') + (_spAlbum.release_date_precision === 'year' ? '-01' : ''),
                                    image_url: _spAlbum.images[0].url,
                                    url: 'https://open.spotify.com/album/' + _spAlbum.id,
                                    spotify_id: _spAlbum.id,
                                    ranking: 502
                                }
                                postAlbum(album);
                            } else {
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                const { album: _, ...patchObject} = { //remove album from object to send to patchAlbum
                                    ...formJson,
                                    id: parseInt(formJson.album.toString().split(' ').slice(-1)[0]),
                                    queue_position: null,
                                    album: null
                                };
                                patchAlbum(patchObject);
                            }
                            closeDialogs();
                        }
                    }
                }}
                fullWidth
                maxWidth='md'
            >
                <DialogTitle>Review Album</DialogTitle>
                <DialogContent>
                    <Box pt={1} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '10px'}}>
                        <Autocomplete
                            options={albums ? albums.filter((album) => album.rating === null): []}
                            renderInput={(params) => <TextField {...params} label='Album' name='album' required/>}
                            getOptionLabel={(album) => `${album.title} - ${album.artist} - ${album.id}`}
                            fullWidth
                            disabled={!!_spAlbum}
                        />
                        <Spotify
                            onChange={(event, target) => {setSpAlbum(target);}}
                            renderInput={(params) => <TextField {...params} label="Search for an album" required={false} />}
                        />
                    </Box>
                    <br/>
                    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '10px'}}>
                        <FormControl fullWidth required>
                            <InputLabel>Rating</InputLabel>
                            <Select
                                name='rating'
                                label='Rating'
                                defaultValue=''
                            >
                                <MenuItem value=''>None</MenuItem>
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                            </Select>
                        </FormControl>
                        <DatePicker
                            label='Date Listened'
                            defaultValue={dayjs()}
                            sx={{ minWidth: 200}}
                            name='date_listened'
                            format='YYYY-MM-DD'
                        />
                        <TextField
                            label='Recommended By'
                            name='recommended_by'
                            sx={{ minWidth: 200}}
                            required
                            fullWidth
                        />
                    </Box>
                    <br/>
                    <TextField
                        label='Favorite Song'
                        name='favorite_song'
                        fullWidth
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button type='submit'>Submit Review</Button>
                </DialogActions>
            </Dialog>
        </div>
        <div className={styles.smallOnly}>
            <Stack direction="column" alignItems='center' spacing={3}>
                <Typography align='center' variant='h3' maxWidth='90%'>Albums Database</Typography>
                <Typography align='center' maxWidth='80%'>The database doesn&#39;t display very well on smaller screens. Please try using a larger device. Sorry!</Typography>
            </Stack>
        </div>
    </Box>;
}
