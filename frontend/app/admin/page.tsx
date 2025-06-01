import Admin from '@/components/Admin';
import { API_URL } from '@/components/Globals';

export default async function Page() {
    const albums = await fetch(`${API_URL}/albums`, { cache: 'no-store'} )
    const amorg = await albums.json()

    return <Admin albums={amorg.albums}/>;
}