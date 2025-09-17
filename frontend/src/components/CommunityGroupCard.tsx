import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { CommunityGroup } from '../types';
import { cardMotion } from './motionPresets';

interface CommunityGroupCardProps {
  group: CommunityGroup;
  selected?: boolean;
  onSelect?: (group: CommunityGroup) => void;
  onJoin?: (group: CommunityGroup) => void;
}

const CommunityGroupCard = ({ group, selected = false, onSelect, onJoin }: CommunityGroupCardProps) => {
  return (
    <motion.div
      className={`card community-card ${selected ? 'community-card--active' : ''}`}
      {...cardMotion}
      onClick={() => onSelect?.(group)}
      role="button"
      tabIndex={0}
      onKeyUp={(event) => {
        if (event.key === 'Enter') {
          onSelect?.(group);
        }
      }}
    >
      <div className="community-card__header">
        <div className="community-card__title">
          <Users size={20} strokeWidth={1.8} />
          <h3>{group.name}</h3>
        </div>
        {group.city && <span className="tag">{group.city}</span>}
      </div>
      <p className="muted">{group.description ?? '分享你的园艺灵感，与同城花友互换经验。'}</p>
      <button
        className="action-button"
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onJoin?.(group);
        }}
      >
        加入圈子
      </button>
    </motion.div>
  );
};

export default CommunityGroupCard;
