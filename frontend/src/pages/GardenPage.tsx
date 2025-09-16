import PlantCard from '../components/PlantCard';
import TaskList from '../components/TaskList';
import { careTasks, plants } from '../data/mockData';

const GardenPage = () => {
  return (
    <div className="garden-page">
      <section>
        <h2 className="section-title">我的花园</h2>
        <p className="muted">
          记录每一株植物的成长故事，支持图文、提醒与 AI 诊断，让养护更有节奏。
        </p>
      </section>

      <section className="grid cols-3">
        {plants.map((plant) => (
          <PlantCard key={plant.id} plant={plant} />
        ))}
      </section>

      <section>
        <TaskList tasks={careTasks} />
      </section>
    </div>
  );
};

export default GardenPage;
