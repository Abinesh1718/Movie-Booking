
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});
interface Token {
  name: string | null;
  token: string | null;
}

API.interceptors.request.use((config) => {
const stored = localStorage.getItem('user');
const token: Token = stored ? JSON.parse(stored) as Token : { name: null, token: null };
  if (token) {
    config.headers.Authorization = `Bearer ${token?.token}`;
  }
  return config;
});

export default API;
