import { secret } from '@aws-amplify/backend';

export const API_URL = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:5000' : 'https://api.benfrymusic.com';
export const ADMIN_PW = process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_ADMIN_PW : secret('ADMIN_PW');