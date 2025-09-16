import ObservationCard from '../components/ObservationCard';
import { observationPoints } from '../data/mockData';

const ObservationsPage = () => {
  return (
    <>
      <section className="section">
        <div className="section__header">
          <h2>城市花期地图</h2>
          <p className="muted">
            上传观测点，和附近花友一起构建“民间物候数据库”，花期将自动同步到你的行程。
          </p>
        </div>
      </section>

      <section className="section">
        <div className="grid grid--3">
          {observationPoints.map((point) => (
            <ObservationCard key={point.id} point={point} />
          ))}
        </div>
      </section>
    </>
  );
};

export default ObservationsPage;
