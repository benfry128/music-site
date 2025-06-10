'use client'
import Button from '@mui/material/Button';
import { searchSpotify } from '@/app/actions';

export default function Spotify() {
    return <Button
        onClick={() => searchSpotify('kind of blue')}
    >
        Click Me
    </Button>
}
