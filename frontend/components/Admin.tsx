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
    const [_reviewDialogOpen, setReviewDialogOpen] = useState(false);

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
                    <Button variant='outlined' onClick={() => setReviewDialogOpen(true)}>Review Album</Button>
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
                    >
                    </DataGrid>
                </>
            }
        </Stack>
        <Dialog
            onClose={() => setReviewDialogOpen(false)}
            open={_reviewDialogOpen}
            slotProps={{
                paper: {
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        const { album: _, ...patchObject} = { //remove album from object to send to patchAlbum
                            ...formJson, 
                            id: parseInt(formJson.album.toString().split(' ').slice(-1)[0]), 
                            queue_position: null,
                            album: null
                        };
                        // setReviewDialogOpen(false);
                        patchAlbum(patchObject);
                    }
                }
            }}
            fullWidth
            maxWidth='sm'
        >
            <DialogTitle>Review Album</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Among Us
                </DialogContentText>
                <br/>
                <Autocomplete
                    options={albums.filter((album) => Number.isNaN(album.rating))}
                    renderInput={(params) => <TextField {...params} label='Album' name='album' required/>}
                    getOptionLabel={(album) => `${album.title} - ${album.artist} - ${album.id}`}
                />
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
    </Box>;
}
