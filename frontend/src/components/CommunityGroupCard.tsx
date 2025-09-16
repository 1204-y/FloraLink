import { CommunityGroup } from '../types';

interface CommunityGroupCardProps {
  group: CommunityGroup;
}

const CommunityGroupCard = ({ group }: CommunityGroupCardProps) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{group.name}</h3>
        <span className="tag">{group.members} 花友</span>
      </div>
      <p className="muted">{group.description}</p>
      <div>
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
    </div>
  );
};

export default CommunityGroupCard;
