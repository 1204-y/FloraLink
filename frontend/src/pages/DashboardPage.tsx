import AssistantPanel from '../components/AssistantPanel';
import ObservationCard from '../components/ObservationCard';
import StatCard from '../components/StatCard';
import TaskList from '../components/TaskList';
import { assistantSuggestions, careTasks, observationPoints, plants } from '../data/mockData';

const DashboardPage = () => {
  return (
    <>
      <section className="section">
        <div className="section__header">
          <h2>今日亮点</h2>
          <p className="muted">实时掌握养护进度、社区热度与花期动态。</p>
        </div>
        <div className="grid grid--4">
          <StatCard label="本周完成养护" value="12 项" trend="比上周 +18%" />
          <StatCard label="花期观测点" value="28 个" highlight="3 个观测点本周即将盛放" />
          <StatCard label="社区互动" value="86 条" trend="活跃圈子 5 个" />
          <StatCard label="AI 问答解决率" value="92%" highlight="24 小时在线" />
        </div>
      </section>

      <section className="section section--split">
        <TaskList tasks={careTasks} />
        <AssistantPanel suggestions={assistantSuggestions.slice(0, 2)} />
      </section>

      <section className="section">
        <div className="section__header">
          <h2>我的植物速览</h2>
          <p className="muted">为重点植物设置提醒，养护节奏更安心。</p>
        </div>
        <div className="grid grid--3">
          {plants.map((plant) => {
            const tone = plant.status === '需关注' ? 'warning' : 'positive';
            return (
              <div key={plant.id} className="card plant-summary">
                <div className="plant-summary__header">
                  <h3>{plant.commonName}</h3>
                  <span className={`plant-status plant-status--${tone}`}>{plant.status}</span>
                </div>
                <p className="muted">{plant.environment}</p>
                <div className="plant-summary__next">
                  <span>下一步</span>
                  <p>{plant.nextTask}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>本周赏花推荐</h2>
          <p className="muted">来自附近花友的实时观测热点。</p>
        </div>
        <div className="grid grid--3">
          {observationPoints.slice(0, 3).map((point) => (
            <ObservationCard key={point.id} point={point} />
          ))}
        </div>
      </section>

      <section className="section">
        <AssistantPanel suggestions={assistantSuggestions} />
      </section>
    </>
  );
};

export default DashboardPage;
