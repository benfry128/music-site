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
import { useState } from 'react';
import Spotify from './Spotify';
import { SpAlbum } from '@/components/Globals';

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
    const [_reviewDialogOpen, setReviewDialogOpen] = useState(false);
    const [_newAlbumDialogOpen, setNewAlbumDialogOpen] = useState(false);
    const [_spAlbum, setSpAlbum] = useState<SpAlbum | null>(null);

    function closeDialogs() {
        setSpAlbum(null);
        setReviewDialogOpen(false);
        setNewAlbumDialogOpen(false);
    }

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
				: <>
                    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '10px'}}>
                        <Button variant='outlined' onClick={() => setReviewDialogOpen(true)}>Review Album</Button>
                        <Button variant='outlined' onClick={() => setNewAlbumDialogOpen(true)}>Add New Album</Button>
                    </Box>
                    <DataGrid
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
                    />
                </>
            }
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
                        if (!!_spAlbum) {
                            const album = {
                                ...formJson,
                                title: _spAlbum.name,
                                artist: _spAlbum.artists[0].name,
                                date_released: _spAlbum.release_date,
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
                        options={albums ? albums.filter((album) => Number.isNaN(album.rating)): []}
                        renderInput={(params) => <TextField {...params} label='Album' name='album' required/>}
                        getOptionLabel={(album) => `${album.title} - ${album.artist} - ${album.id}`}
                        fullWidth
                        disabled={!!_spAlbum}
                    />
                    <Spotify
                        onChange={(event, target) => {setSpAlbum(target);}}
                        required={false}
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
                    >
                        From
                    </TextField>
                </Box>
                <br/>
                <TextField
                    label='Favorite Song'
                    name='favorite_song'
                    fullWidth
                    required
                >
                    Favorite Track
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button type='submit'>Submit Review</Button>
            </DialogActions>
        </Dialog>
        <Dialog
            onClose={closeDialogs}
            open={_newAlbumDialogOpen}
            fullWidth
            maxWidth='sm'
        >
            <DialogTitle>Add Album To DB</DialogTitle>
            <DialogContent>
                <Box pt={1}>
                    <Spotify
                        onChange={(event, target) => {setSpAlbum(target);}}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        const album = {
                            title: _spAlbum?.name,
                            artist: _spAlbum?.artists[0].name,
                            date_released: _spAlbum?.release_date,
                            image_url: _spAlbum?.images[0].url,
                            url: 'https://open.spotify.com/album/' + _spAlbum?.id,
                            spotify_id: _spAlbum?.id, 
                            ranking: 502
                        }
                        postAlbum(album);
                        closeDialogs();
                    }}
                    disabled={!_spAlbum}
                >
                    Add Album
                </Button>
            </DialogActions>
        </Dialog>
    </Box>;
}
