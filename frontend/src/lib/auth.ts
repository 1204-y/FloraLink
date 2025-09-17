import api from './api';
import type { TokenResponse } from '../types';

const TOKEN_KEY = 'floralink_token';
const DEMO_EMAIL = 'demo@floralink.app';
const DEMO_PASSWORD = 'floralink-demo';

export const getStoredToken = () =>
  (typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null);

export const storeToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

export const clearToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
  }
};

const login = async (email: string, password: string) => {
  const formData = new URLSearchParams();
  formData.append('username', email);
  formData.append('password', password);
  const { data } = await api.post<TokenResponse>('/auth/token', formData, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });
  return data.access_token;
};

const registerDemoUser = async () => {
  await api.post('/auth/register', {
    email: DEMO_EMAIL,
    password: DEMO_PASSWORD,
    full_name: '演示花友',
    city: '成都'
  });
};

export const ensureDemoSession = async (): Promise<string> => {
  const existing = getStoredToken();
  if (existing) {
    return existing;
  }
  try {
    const token = await login(DEMO_EMAIL, DEMO_PASSWORD);
    storeToken(token);
    return token;
  } catch (error: any) {
    if (error?.response?.status === 400) {
      await registerDemoUser();
      const token = await login(DEMO_EMAIL, DEMO_PASSWORD);
      storeToken(token);
      return token;
    }
    throw error;
  }
};
