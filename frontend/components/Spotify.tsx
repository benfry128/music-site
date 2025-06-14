'use client'

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box'
import { SyntheticEvent, useState } from 'react';
import { searchSpotify } from '@/app/actions';
import { SpAlbum } from './Globals';

let timer : NodeJS.Timeout;

export default function Spotify({ onChange }: { onChange : (event: SyntheticEvent, value: SpAlbum | null) => void }) {
    const [_searchStr, setSearchStr] = useState('');
    const [_possibleAlbums, setPossibleAlbums] = useState([]);

    return <Box p={1}>
        <Autocomplete
            filterOptions={(x) => x}
            inputValue={_searchStr}
            onInputChange={ (event, newString) => {
                setSearchStr(newString);

                //throttling spotify requests
                clearTimeout(timer);

                if (newString) {
                    timer = setTimeout(async () => {
                        const stuff = await searchSpotify(newString);
                        setPossibleAlbums(stuff);
                    }, 1000);
                } else {
                    setPossibleAlbums([]);
                }
            }}
            renderInput={(params) => <TextField {...params} label="Search for an album" name='spotifyAlbum'/>}
            options={_possibleAlbums}
            sx={{
                minWidth: '300px'
            }}
            getOptionLabel={(album : SpAlbum) => `${album.name} - ${album.artists[0].name} - ${album.id}`}
            onChange={(event, value) => {onChange(event, value);}}
        />
    </Box>;
}
