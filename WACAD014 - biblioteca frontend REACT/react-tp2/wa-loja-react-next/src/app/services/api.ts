import axios from 'axios';

export const productsApi = axios.create({
  baseURL: 'https://ranekapi.origamid.dev/json/api',
});

export const favoriteApi = axios.create({
  baseURL: 'https://shimmer-separate-blouse.glitch.me', // Substitua pela URL da sua API no Vercel/Glitch
});