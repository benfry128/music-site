'use client'

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { SyntheticEvent, useState } from 'react';
import { searchSpotify } from '@/app/actions';
import { SpAlbum } from './Globals';
import { SimplifiedAlbum } from '@spotify/web-api-ts-sdk';

let timer : NodeJS.Timeout;

export default function Spotify({ onChange, required }: { onChange : (event: SyntheticEvent, value: SpAlbum | null) => void, required : boolean }) {
    const [_searchStr, setSearchStr] = useState('');
    const [_possibleAlbums, setPossibleAlbums] = useState<SimplifiedAlbum[]>([]);

    return <Autocomplete
        filterOptions={(x) => x}
        inputValue={_searchStr}
        onInputChange={ (event, newString, reason) => {
            setSearchStr(newString);

            //throttling spotify requests
            clearTimeout(timer);

            if (reason === 'input' && newString) {
                timer = setTimeout(async () => {
                    const stuff = await searchSpotify(newString);
                    setPossibleAlbums(stuff);
                }, 400);
            } else {
                setPossibleAlbums([]);
            }
        }}
        renderInput={(params) => <TextField {...params} label="Search for an album" required={required} />}
        options={_possibleAlbums}
        sx={{
            minWidth: '300px'
        }}
        getOptionLabel={(album : SpAlbum) => `${album.name} - ${album.artists[0].name}`}
        onChange={(event, value) => {onChange(event, value);}}
        fullWidth
    />;
}
