import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { GardenPlant } from '../types';
import Timeline from './Timeline';
import { cardMotion } from './motionPresets';

interface PlantCardProps {
  plant: GardenPlant;
}

const statusMap: Record<GardenPlant['status'], { tone: 'positive' | 'warning'; icon: typeof CheckCircle2; label: string }> = {
  healthy: { tone: 'positive', icon: CheckCircle2, label: '状态良好' },
  attention: { tone: 'warning', icon: AlertTriangle, label: '需要关注' }
};

const PlantCard = ({ plant }: PlantCardProps) => {
  const status = statusMap[plant.status] ?? statusMap.healthy;
  const StatusIcon = status.icon;
  const displayName = plant.nickname || plant.species_common_name || '未命名植物';
  const scientific = plant.species_scientific_name;

  return (
    <motion.div className="card plant-card" {...cardMotion}>
      <div className="plant-card__banner">
        <div>
          <p className="eyebrow">{plant.environment_notes || '花园微环境良好'}</p>
          <h3>{displayName}</h3>
          {scientific && <p>{scientific}</p>}
        </div>
        <span className={`plant-status plant-status--${status.tone}`}>
          <StatusIcon size={16} strokeWidth={1.8} />
          {status.label}
        </span>
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
          <span>{plant.next_task ?? '暂无固定任务，保持日常巡检即可'}</span>
        </div>
        <Timeline events={plant.timeline} />
      </div>
    </motion.div>
  );
};

export default PlantCard;
