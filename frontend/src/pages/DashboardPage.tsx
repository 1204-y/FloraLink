import AssistantPanel from '../components/AssistantPanel';
import ObservationCard from '../components/ObservationCard';
import StatCard from '../components/StatCard';
import TaskList from '../components/TaskList';
import { assistantSuggestions, careTasks, observationPoints, plants } from '../data/mockData';

const DashboardPage = () => {
  return (
    <div className="dashboard">
      <section>
        <h2 className="section-title">今日亮点</h2>
        <div className="grid cols-4">
          <StatCard label="本周完成养护" value="12 项" trend="比上周 +18%" />
          <StatCard label="花期观测点" value="28 个" highlight="3 个观测点本周即将盛放" />
          <StatCard label="社区互动" value="86 条" trend="活跃圈子 5 个" />
          <StatCard label="AI 问答解决率" value="92%" highlight="24 小时在线" />
        </div>
      </section>

      <section className="grid cols-2">
        <TaskList tasks={careTasks} />
        <AssistantPanel suggestions={assistantSuggestions.slice(0, 2)} />
      </section>

      <section>
        <h2 className="section-title">我的植物速览</h2>
        <div className="grid cols-3">
          {plants.map((plant) => (
            <div key={plant.id} className="card">
              <div className="card-header">
                <h3 className="card-title">{plant.commonName}</h3>
                <span className="tag">{plant.status}</span>
              </div>
              <img className="plant-cover" src={plant.imageUrl} alt={plant.commonName} />
              <p className="muted">{plant.environment}</p>
              <p>
                <strong>下一步：</strong>
                {plant.nextTask}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="section-title">本周赏花推荐</h2>
        <div className="grid cols-3">
          {observationPoints.slice(0, 3).map((point) => (
            <ObservationCard key={point.id} point={point} />
          ))}
        </div>
      </section>

      <section>
        <AssistantPanel suggestions={assistantSuggestions} />
      </section>
    </div>
  );
};

export default DashboardPage;
