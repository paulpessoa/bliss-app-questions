import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  headers: {
    apikey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
  },
});

export default api;
