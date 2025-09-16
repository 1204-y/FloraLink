import { ObservationPoint } from '../types';

interface ObservationCardProps {
  point: ObservationPoint;
}

const ObservationCard = ({ point }: ObservationCardProps) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{point.name}</h3>
        <span className="badge">{point.city}</span>
      </div>
      <p className="muted">坐标：{point.coordinates}</p>
      <p>{point.bloomWindow}</p>
      <div className="callout">
        <strong>花友 @{point.contributor}</strong>
        <span>{point.highlight}</span>
      </div>
      <button className="action-button">导航 · 保存到花期日历</button>
    </div>
  );
};

export default ObservationCard;
