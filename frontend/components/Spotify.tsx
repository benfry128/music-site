'use client'

import Autocomplete, { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import { SyntheticEvent, useState } from 'react';
import { searchSpotify } from '@/app/actions';
import { SimplifiedAlbum } from '@spotify/web-api-ts-sdk';

let timer : NodeJS.Timeout;

export default function Spotify({ onChange, renderInput }: { onChange : (event: SyntheticEvent, value: SimplifiedAlbum | null) => void, renderInput: (params: AutocompleteRenderInputParams) => React.ReactNode }) {
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
        renderInput={renderInput}
        options={_possibleAlbums}
        getOptionLabel={(album : SimplifiedAlbum) => `${album.name} - ${album.artists[0].name}`}
        onChange={(event, value) => {onChange(event, value);}}
        fullWidth
    />;
}
