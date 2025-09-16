import EncyclopediaTable from '../components/EncyclopediaTable';
import { encyclopediaEntries } from '../data/mockData';

const EncyclopediaPage = () => {
  return (
    <div className="encyclopedia-page">
      <section>
        <h2 className="section-title">植物百科</h2>
        <p className="muted">
          聚合花友实测数据与专业知识库，可按环境、季节、难度筛选适合你的植物。
        </p>
      </section>
      <section>
        <EncyclopediaTable entries={encyclopediaEntries} />
      </section>
    </div>
  );
};

export default EncyclopediaPage;
