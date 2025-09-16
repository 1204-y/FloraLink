import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { CommunityGroup } from '../types';
import { cardMotion } from './motionPresets';

interface CommunityGroupCardProps {
  group: CommunityGroup;
}

const CommunityGroupCard = ({ group }: CommunityGroupCardProps) => {
  return (
    <motion.div className="card community-card" {...cardMotion}>
      <div className="community-card__header">
        <div className="community-card__title">
          <Users size={20} strokeWidth={1.8} />
          <h3>{group.name}</h3>
        </div>
        <span className="tag">{group.members} 花友</span>
      </div>
      <p className="muted">{group.description}</p>
      <div className="community-card__topics">
        <p className="muted">热门话题</p>
        <div className="chip-row">
          {group.trendingTopics.map((topic) => (
            <span key={topic} className="chip">
              #{topic}
            </span>
          ))}
        </div>
      </div>
      <button className="action-button">加入圈子</button>
    </motion.div>
  );
};

export default CommunityGroupCard;
