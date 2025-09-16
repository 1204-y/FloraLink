import { motion } from 'framer-motion';
import { cardMotion } from './motionPresets';

interface StatCardProps {
  label: string;
  value: string;
  trend?: string;
  highlight?: string;
}

const StatCard = ({ label, value, trend, highlight }: StatCardProps) => {
  return (
    <motion.div className="card stat-card" {...cardMotion}>
      <p className="muted">{label}</p>
      <h3>{value}</h3>
      {trend && <span className="stat-card__trend">{trend}</span>}
      {highlight && <p className="muted">{highlight}</p>}
    </motion.div>
  );
};

export default StatCard;
