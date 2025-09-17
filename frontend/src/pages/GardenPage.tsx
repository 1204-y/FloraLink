import { useMemo } from 'react';
import PlantCard from '../components/PlantCard';
import TaskList from '../components/TaskList';
import useGardenDashboard from '../hooks/useGardenDashboard';

const GardenPage = () => {
  const { data, loading, error, refresh } = useGardenDashboard();
  const plants = useMemo(
    () => data?.gardens.flatMap((garden) => garden.plants) ?? [],
    [data]
  );

  return (
    <>
      <section className="section">
        <div className="section__header">
          <h2>我的花园</h2>
          <p className="muted">
            记录每一株植物的成长故事，支持图文、提醒与 AI 诊断，让养护更有节奏。
          </p>
          <button className="ghost-button" type="button" onClick={() => void refresh()}>
            刷新数据
          </button>
        </div>
        {error && <p className="form-error">{error}</p>}
      </section>

      <section className="section">
        {loading ? (
          <p className="muted">正在加载植物数据…</p>
        ) : (
          <div className="grid grid--2">
            {plants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        )}
        {!loading && plants.length === 0 && (
          <p className="muted">还没有植物被记录，添加你的第一株植物来开启成长档案。</p>
        )}
      </section>

      <section className="section">
        <TaskList tasks={data?.tasks ?? []} loading={loading} />
      </section>
    </>
  );
};

export default GardenPage;
