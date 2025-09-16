import { Plant } from '../types';
import Timeline from './Timeline';

interface PlantCardProps {
  plant: Plant;
}

const PlantCard = ({ plant }: PlantCardProps) => {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="card-title">{plant.commonName}</h3>
          <p className="muted">{plant.scientificName}</p>
        </div>
        <span className="tag">{plant.status}</span>
      </div>
      <img className="plant-cover" src={plant.imageUrl} alt={plant.commonName} />
      <p className="muted">{plant.environment}</p>
      <div className="chip-row">
        {plant.tags.map((tag) => (
          <span key={tag} className="chip">
            #{tag}
          </span>
        ))}
      </div>
      <div className="callout">
        <strong>下一步养护：</strong>
        <span>{plant.nextTask}</span>
      </div>
      <Timeline events={plant.timeline} />
    </div>
  );
};

export default PlantCard;
