import { CalendarDays, MapPin, Navigation } from 'lucide-react';
import { ObservationPoint } from '../types';

interface ObservationCardProps {
  point: ObservationPoint;
}

const ObservationCard = ({ point }: ObservationCardProps) => {
  return (
    <div className="card observation-card">
      <div className="observation-card__header">
        <div className="observation-card__title">
          <MapPin size={20} strokeWidth={1.8} />
          <div>
            <h3>{point.name}</h3>
            <p>{point.city}</p>
          </div>
        </div>
        <span className="badge">花友 @{point.contributor}</span>
      </div>
      <div className="observation-card__body">
        <p className="muted">坐标：{point.coordinates}</p>
        <p className="observation-card__window">
          <CalendarDays size={18} strokeWidth={1.8} />
          {point.bloomWindow}
        </p>
        <p>{point.highlight}</p>
      </div>
      <button className="action-button action-button--ghost">
        <Navigation size={18} strokeWidth={1.8} /> 导航 · 保存到花期日历
      </button>
    </div>
  );
};

export default ObservationCard;
