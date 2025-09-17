import { useCallback, useEffect, useState } from 'react';
import api from '../lib/api';
import type { GardenDashboardResponse } from '../types';

export const useGardenDashboard = () => {
  const [data, setData] = useState<GardenDashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get<GardenDashboardResponse>('/garden');
      setData(data);
      setError(null);
    } catch (err: any) {
      setError(err?.response?.data?.detail ?? '无法加载花园数据');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchDashboard();
  }, [fetchDashboard]);

  return { data, loading, error, refresh: fetchDashboard };
};

export default useGardenDashboard;
