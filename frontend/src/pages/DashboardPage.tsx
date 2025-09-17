import { useEffect, useMemo, useState } from 'react';
import AssistantPanel from '../components/AssistantPanel';
import ObservationCard from '../components/ObservationCard';
import StatCard from '../components/StatCard';
import TaskList from '../components/TaskList';
import useAssistant from '../hooks/useAssistant';
import useGardenDashboard from '../hooks/useGardenDashboard';
import api from '../lib/api';
import type { Observation } from '../types';

const DashboardPage = () => {
  const { data: gardenData, loading: gardenLoading, error: gardenError } = useGardenDashboard();
  const { messages, ask, loading: assistantLoading, suggestions } = useAssistant();
  const [observations, setObservations] = useState<Observation[]>([]);
  const [obsError, setObsError] = useState<string | null>(null);
  const [obsLoading, setObsLoading] = useState(true);

  useEffect(() => {
    const fetchObservations = async () => {
      try {
        setObsLoading(true);
        const { data } = await api.get<Observation[]>('/observations', { params: { limit: 6 } });
        setObservations(data);
        setObsError(null);
      } catch (error: any) {
        setObsError(error?.response?.data?.detail ?? '无法获取观测数据');
      } finally {
        setObsLoading(false);
      }
    };

    void fetchObservations();
  }, []);

  const stats = gardenData?.stats;
  const highlightPlants = useMemo(
    () => gardenData?.gardens.flatMap((garden) => garden.plants).slice(0, 3) ?? [],
    [gardenData]
  );
  const tasks = gardenData?.tasks.slice(0, 6) ?? [];
  const featuredObservations = observations.slice(0, 3);

  return (
    <>
      <section className="section">
        <div className="section__header">
          <h2>今日亮点</h2>
          <p className="muted">实时掌握养护进度、花期动态与 AI 建议。</p>
        </div>
        <div className="grid grid--4">
          <StatCard
            label="花园数量"
            value={`${stats?.total_gardens ?? 0} 个`}
            highlight="已完成空间同步"
          />
          <StatCard
            label="植物总数"
            value={`${stats?.total_plants ?? 0} 株`}
            highlight="持续更新成长记录"
          />
          <StatCard
            label="待办任务"
            value={`${stats?.due_tasks ?? 0} 项`}
            trend={`即将到期 ${stats?.upcoming_tasks ?? 0} 项`}
          />
          <StatCard
            label="观测热点"
            value={`${observations.length}`}
            highlight={obsLoading ? '同步观测中…' : '来自附近花友的即时分享'}
          />
        </div>
        {gardenError && <p className="form-error">{gardenError}</p>}
      </section>

      <section className="section section--split">
        <TaskList tasks={tasks} loading={gardenLoading} />
        <AssistantPanel
          messages={messages}
          onAsk={ask}
          loading={assistantLoading}
          suggestions={suggestions}
        />
      </section>

      <section className="section">
        <div className="section__header">
          <h2>我的植物速览</h2>
          <p className="muted">为重点植物设置提醒，养护节奏更安心。</p>
        </div>
        <div className="grid grid--3">
          {highlightPlants.map((plant) => (
            <div key={plant.id} className="card plant-summary">
              <div className="plant-summary__header">
                <h3>{plant.nickname || plant.species_common_name || '未命名植物'}</h3>
                <span
                  className={`plant-status plant-status--${plant.status === 'attention' ? 'warning' : 'positive'}`}
                >
                  {plant.status === 'attention' ? '需要关注' : '状态良好'}
                </span>
              </div>
              <p className="muted">{plant.environment_notes || '保持通风与适宜光照'}</p>
              <div className="plant-summary__next">
                <span>下一步</span>
                <p>{plant.next_task ?? '按需巡检，记录生长变化'}</p>
              </div>
            </div>
          ))}
          {!highlightPlants.length && !gardenLoading && (
            <p className="muted">暂未登记植物，去花园页添加你的第一株绿植吧。</p>
          )}
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>本周赏花推荐</h2>
          <p className="muted">来自附近花友的实时观测热点。</p>
        </div>
        <div className="grid grid--3">
          {featuredObservations.map((observation) => (
            <ObservationCard key={observation.id} observation={observation} />
          ))}
        </div>
        {obsError && <p className="form-error">{obsError}</p>}
      </section>
    </>
  );
};

export default DashboardPage;
