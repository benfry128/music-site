import Albums from '@/components/Albums';
import { API_URL } from '@/components/Globals';

export default async function Page() {
	const albums = await fetch(`${API_URL}/albums/queue`, { cache: 'no-store'} )
    const amorg = await albums.json()

    return <Albums albums={amorg.albums}/>;
}