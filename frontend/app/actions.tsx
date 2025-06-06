'use server'
import { API_URL } from '@/components/Globals';


export async function patchAlbum() {
    const albums = await fetch(`${API_URL}/albums/queue`, { cache: 'no-store'} )
    const amorg = await albums.json()

    console.log(amorg);
}