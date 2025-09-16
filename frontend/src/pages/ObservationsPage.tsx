import ObservationCard from '../components/ObservationCard';
import { observationPoints } from '../data/mockData';

const ObservationsPage = () => {
  return (
    <div className="observations-page">
      <section>
        <h2 className="section-title">城市花期地图</h2>
        <p className="muted">
          上传观测点，和附近花友一起构建“民间物候数据库”，花期将自动同步到你的行程。
        </p>
      </section>

      <section className="grid cols-3">
        {observationPoints.map((point) => (
          <ObservationCard key={point.id} point={point} />
        ))}
      </section>
    </div>
  );
};

export default ObservationsPage;
