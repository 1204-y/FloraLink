import { useEffect, useMemo, useState } from 'react';
import ObservationCard from '../components/ObservationCard';
import ObservationMap from '../components/ObservationMap';
import api from '../lib/api';
import type { Observation } from '../types';

const ObservationsPage = () => {
  const [observations, setObservations] = useState<Observation[]>([]);
  const [selected, setSelected] = useState<Observation | null>(null);
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    const fetchObservations = async () => {
      try {
        setLoading(true);
        const { data } = await api.get<Observation[]>('/observations', { params: { limit: 40 } });
        setObservations(data);
        setError(null);
      } catch (err: any) {
        setError(err?.response?.data?.detail ?? '无法加载观测数据');
      } finally {
        setLoading(false);
      }
    };

    void fetchObservations();
  }, []);

  const handleLocate = () => {
    if (!navigator.geolocation) {
      setError('当前浏览器不支持定位功能');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserPosition([position.coords.latitude, position.coords.longitude]);
        setLocating(false);
      },
      () => {
        setLocating(false);
        setError('无法获取当前位置，可在浏览器设置中开启定位权限');
      }
    );
  };

  const featured = useMemo(() => (selected ? [selected, ...observations.filter((obs) => obs.id !== selected.id)] : observations), [observations, selected]);

  return (
    <>
      <section className="section">
        <div className="section__header">
          <h2>城市花期地图</h2>
          <p className="muted">
            上传观测点，和附近花友一起构建“民间物候数据库”，花期将自动同步到你的行程。
          </p>
          <button className="ghost-button" type="button" onClick={handleLocate} disabled={locating}>
            {locating ? '定位中…' : '获取我的位置'}
          </button>
        </div>
        {error && <p className="form-error">{error}</p>}
      </section>

      <section className="section observation-section">
        <ObservationMap
          observations={observations}
          userPosition={userPosition}
          selectedId={selected?.id}
          onSelect={setSelected}
        />
      </section>

      <section className="section">
        <div className="grid grid--3">
          {loading ? (
            <p className="muted">正在加载观测点…</p>
          ) : (
            featured.slice(0, 6).map((observation) => (
              <ObservationCard
                key={observation.id}
                observation={observation}
                active={selected?.id === observation.id}
                onFocus={setSelected}
              />
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default ObservationsPage;
