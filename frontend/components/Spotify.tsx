'use client'

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { useState } from 'react';
import { searchSpotify } from '@/app/actions';

interface SpAlbum {
    id: string; 
    name: string;
    artists: {
        name: string;
    }[];
}

let timer : NodeJS.Timeout;

export default function Spotify() {
    const [_searchStr, setSearchStr] = useState('');
    const [_possibleAlbums, setPossibleAlbums] = useState([]);

    return <Autocomplete
        inputValue={_searchStr}
        onInputChange={ (event, newString) => {
            setSearchStr(newString);

            //throttling spotify requests
            clearTimeout(timer);

            if (newString) {
                timer = setTimeout(async () => {
                    const stuff = await searchSpotify(newString);
                    setPossibleAlbums(stuff);
                    console.log(stuff[0].artists[0].name);
                }, 1000);
            } else {
                setPossibleAlbums([]);
            }
        }}
        renderInput={(params) => <TextField {...params} label="Search for an album" />}
        options={_possibleAlbums}
        sx={{
            minWidth: '300px'
        }}
        getOptionLabel={(album : SpAlbum) => `${album.name} - ${album.artists[0].name} - ${album.id}`}
    />;
}
