export const API_URL = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:5000' : 'https://api.benfrymusic.com';

export interface Album {
    id: number; 
    title: string;
    artist: string;
    date_released: number;
    rating: number;
    date_listened: number;
    favorite_song: string;
    recommended_by: string;
    ranking: number; 
    queue_position: number
    image_url: string;
    url: string;
}