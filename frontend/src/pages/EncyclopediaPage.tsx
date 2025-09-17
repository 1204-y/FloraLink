import { useEffect, useState } from 'react';
import EncyclopediaTable from '../components/EncyclopediaTable';
import api from '../lib/api';
import type { PlantSpecies } from '../types';

const EncyclopediaPage = () => {
  const [entries, setEntries] = useState<PlantSpecies[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        setLoading(true);
        const { data } = await api.get<PlantSpecies[]>('/plants/species', { params: { limit: 50 } });
        setEntries(data);
      } catch (err: any) {
        setError(err?.response?.data?.detail ?? '无法加载植物百科');
      } finally {
        setLoading(false);
      }
    };

    void fetchSpecies();
  }, []);

  return (
    <>
      <section className="section">
        <div className="section__header">
          <h2>植物百科</h2>
          <p className="muted">
            聚合花友实测数据与专业知识库，可按环境、季节、难度筛选适合你的植物。
          </p>
        </div>
        {error && <p className="form-error">{error}</p>}
      </section>
      <section className="section">
        {loading ? <p className="muted">正在加载植物资料…</p> : <EncyclopediaTable entries={entries} />}
      </section>
    </>
  );
};

export default EncyclopediaPage;
