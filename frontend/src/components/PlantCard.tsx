import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Plant } from '../types';
import Timeline from './Timeline';

interface PlantCardProps {
  plant: Plant;
}

const statusMap: Record<string, { tone: 'positive' | 'warning'; icon: typeof CheckCircle2 }> = {
  健康: { tone: 'positive', icon: CheckCircle2 },
  需关注: { tone: 'warning', icon: AlertTriangle }
};

const PlantCard = ({ plant }: PlantCardProps) => {
  const status = statusMap[plant.status] ?? { tone: 'positive', icon: CheckCircle2 };
  const StatusIcon = status.icon;

  return (
    <div className="card plant-card">
      <div className="plant-card__banner">
        <div>
          <p className="eyebrow">{plant.environment}</p>
          <h3>{plant.commonName}</h3>
          <p>{plant.scientificName}</p>
        </div>
        <span className={`plant-status plant-status--${status.tone}`}>
          <StatusIcon size={16} strokeWidth={1.8} />
          {plant.status}
        </span>
      </div>
      <div className="plant-card__media">
        <img src={plant.imageUrl} alt={plant.commonName} />
      </div>
      <div className="plant-card__body">
        <div className="chip-row">
          {plant.tags.map((tag) => (
            <span key={tag} className="chip">
              #{tag}
            </span>
          ))}
        </div>
        <div className="plant-card__callout">
          <strong>下一步养护</strong>
          <span>{plant.nextTask}</span>
        </div>
        <Timeline events={plant.timeline} />
      </div>
    </div>
  );
};

export default PlantCard;
