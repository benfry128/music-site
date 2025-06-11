'use server'
import { API_URL } from '@/components/Globals';
import { Album } from '@/components/Globals';


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
    const formData = new FormData();
    formData.append('album', search);

    const response = await fetch(`${API_URL}/spotify/search/${search}`)
    const albums = await response.json();

    console.log(albums.albums[0]);

    return albums.albums;
}