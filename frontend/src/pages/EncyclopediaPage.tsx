import EncyclopediaTable from '../components/EncyclopediaTable';
import { encyclopediaEntries } from '../data/mockData';

const EncyclopediaPage = () => {
  return (
    <>
      <section className="section">
        <div className="section__header">
          <h2>植物百科</h2>
          <p className="muted">
            聚合花友实测数据与专业知识库，可按环境、季节、难度筛选适合你的植物。
          </p>
        </div>
      </section>
      <section className="section">
        <EncyclopediaTable entries={encyclopediaEntries} />
      </section>
    </>
  );
};

export default EncyclopediaPage;
