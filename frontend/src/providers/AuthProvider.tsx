import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import api from '../lib/api';
import { clearToken, ensureDemoSession, getStoredToken, storeToken } from '../lib/auth';
import type { UserProfile } from '../types';

interface AuthContextValue {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  logout: () => void;
  bootstrap: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      const { data } = await api.get<UserProfile>('/users/me');
      setUser(data);
      setError(null);
    } catch (err: any) {
      setError(err?.response?.data?.detail ?? '未能加载用户信息');
    }
  }, []);

  const bootstrap = useCallback(async () => {
    try {
      setLoading(true);
      const existing = getStoredToken();
      if (!existing) {
        const token = await ensureDemoSession();
        storeToken(token);
      }
      await fetchProfile();
    } catch (err: any) {
      setError(err?.response?.data?.detail ?? '初始化登录状态失败');
    } finally {
      setLoading(false);
    }
  }, [fetchProfile]);

  useEffect(() => {
    void bootstrap();
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    await bootstrap();
  }, [bootstrap]);

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, loading, error, refresh, logout, bootstrap }),
    [user, loading, error, refresh, logout, bootstrap]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
};
