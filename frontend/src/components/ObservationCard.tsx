import { motion } from 'framer-motion';
import { CalendarDays, MapPin, Navigation } from 'lucide-react';
import { Observation } from '../types';
import { cardMotion } from './motionPresets';

interface ObservationCardProps {
  observation: Observation;
  active?: boolean;
  onFocus?: (observation: Observation) => void;
}

const ObservationCard = ({ observation, active = false, onFocus }: ObservationCardProps) => {
  const title = observation.location_name || observation.species_common_name || '花期观测点';
  const observer = observation.reporter_id ? `#${observation.reporter_id}` : '花友';
  const observedAt = observation.observed_at
    ? new Date(observation.observed_at).toLocaleString('zh-CN', {
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    : '时间未记录';

  return (
    <motion.div
      className={`card observation-card ${active ? 'observation-card--active' : ''}`}
      {...cardMotion}
      onClick={() => onFocus?.(observation)}
    >
      <div className="observation-card__header">
        <div className="observation-card__title">
          <MapPin size={20} strokeWidth={1.8} />
          <div>
            <h3>{title}</h3>
            <p>{observation.species_common_name ?? '未知品种'}</p>
          </div>
        </div>
        <span className="badge">花友 {observer}</span>
      </div>
      <div className="observation-card__body">
        <p className="muted">
          坐标：{observation.latitude.toFixed(3)}, {observation.longitude.toFixed(3)}
        </p>
        <p className="observation-card__window">
          <CalendarDays size={18} strokeWidth={1.8} />
          {observedAt}
        </p>
        <p>{observation.note ?? '这片花正悄悄盛开，快来记录更多细节吧。'}</p>
      </div>
      <button
        className="action-button action-button--ghost"
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onFocus?.(observation);
        }}
      >
        <Navigation size={18} strokeWidth={1.8} /> 聚焦此观测点
      </button>
    </motion.div>
  );
};

export default ObservationCard;
