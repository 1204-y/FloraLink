import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api'
});

api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('floralink_token') : null;
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`
    };
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (import.meta.env.DEV) {
      console.error('API error', error);
    }
    return Promise.reject(error);
  }
);

export default api;
