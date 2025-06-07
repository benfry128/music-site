import Admin from '@/components/Admin';
import { Album, API_URL, BackendAlbum, convertBackendAlbum } from '@/components/Globals';

export default async function Page() {
    const response = await fetch(`${API_URL}/albums`, { cache: 'no-store'} )
    const albums : Album[] = (await response.json()).albums.map((album : BackendAlbum) => convertBackendAlbum(album))

    return <Admin albums={albums}/>;
}