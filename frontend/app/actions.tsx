'use server'
import { API_URL, convertBackendAlbum } from '@/components/Globals';
import { Album } from '@/components/Globals';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';


export async function patchAlbum(updatedRow: Partial<Album>) {
    const formData = new FormData();
    Object.entries(updatedRow).forEach(([key, value]) => {
        const valueToAppend = value instanceof Date ? value.toISOString().slice(0, 10) : value;
        const denullValue = valueToAppend === null ? 'null' : valueToAppend;
        formData.append(key, denullValue.toString());
    })

    const response = await fetch(`${API_URL}/albums/${updatedRow.id}`, {
        method: 'PATCH', 
        body: formData
    })

    if (response.status !== 200){
        return -1;
    }
    return 0;
}


export async function searchSpotify(search: string) {
    const sdk = SpotifyApi.withClientCredentials(process.env.SPOTIFY_CLIENT_ID || '', process.env.SPOTIFY_CLIENT_SECRET || '');

    const items = await sdk.search(search, ['album']);

    return items.albums.items;
}


export async function postAlbum(data: Partial<Album>): Promise<Album | -1> {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        const valueToAppend = value instanceof Date ? value.toISOString().slice(0, 10) : value;
        const denullValue = valueToAppend === null ? 'null' : valueToAppend;
        formData.append(key, denullValue.toString());
    })

    const response = await fetch(`${API_URL}/albums`, {
        method: 'POST', 
        body: formData
    })

    if (response.status !== 200){
        return -1;
    }

    const r = await response.json();
    
    return convertBackendAlbum(r.album);
}


export async function postNotes(postObject: { id: number, source: string, notes: string, }) {
    const formData = new FormData();
    Object.entries(postObject).forEach(([key, value]) => {
        formData.append(key, value.toString());
    })

    const response = await fetch(`${API_URL}/albums/${postObject.id}/notes`, {
        method: 'POST', 
        body: formData
    })

    if (response.status !== 200){
        return -1;
    }
    return 0;
}