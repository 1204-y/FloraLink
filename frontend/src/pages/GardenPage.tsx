import PlantCard from '../components/PlantCard';
import TaskList from '../components/TaskList';
import { careTasks, plants } from '../data/mockData';

const GardenPage = () => {
  return (
    <>
      <section className="section">
        <div className="section__header">
          <h2>我的花园</h2>
          <p className="muted">
            记录每一株植物的成长故事，支持图文、提醒与 AI 诊断，让养护更有节奏。
          </p>
        </div>
      </section>

      <section className="section">
        <div className="grid grid--2">
          {plants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
      </section>

      <section className="section">
        <TaskList tasks={careTasks} />
      </section>
    </>
  );
};

export default GardenPage;
