export const API_URL = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:5000' : 'https://api.benfrymusic.com';

export interface Album {
    id: number; 
    title: string;
    artist: string;
    date_released: Date | string;
    rating: number | null;
    date_listened: Date | null;
    favorite_song: string;
    ranking: number | null;
    queue_position: number | null;
    image_url: string;
    url: string;
    spotify_id: string | null;
}

export interface BackendAlbum {
    id: string;
    title: string;
    artist: string;
    date_released: string;
    rating: string | null;
    date_listened: string | null;
    favorite_song: string;
    ranking: string | null;
    queue_position: string | null;
    image_url: string;
    url: string;
    spotify_id: string | null;
}

function getDateFromString(dateString: string | null) {
    if (dateString === null) {
        return null
    }
    return new Date(dateString);
}

export function convertBackendAlbum(album: BackendAlbum): Album {
    return {
        id: parseInt(album.id),
        title: album.title,
        artist: album.artist,
        date_released: new Date(album.date_released),
        rating: album.rating === null ? null : parseInt(album.rating),
        date_listened: getDateFromString(album.date_listened),
        favorite_song: album.favorite_song,
        ranking: album.ranking ? parseInt(album.ranking) : null,
        queue_position: album.queue_position ? parseInt(album.queue_position) : null,
        image_url: album.image_url,
        url: album.url,
        spotify_id: album.spotify_id
    }
}