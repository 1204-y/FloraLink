import CommunityGroupCard from '../components/CommunityGroupCard';
import CommunityPostCard from '../components/CommunityPostCard';
import { communityGroups, communityPosts } from '../data/mockData';

const CommunitiesPage = () => {
  return (
    <div className="communities-page">
      <section>
        <h2 className="section-title">圈子广场</h2>
        <p className="muted">
          按地域、品种、主题聚集同好，参与话题、线下活动和苗木交换。
        </p>
      </section>

      <section className="grid cols-3">
        {communityGroups.map((group) => (
          <CommunityGroupCard key={group.id} group={group} />
        ))}
      </section>

      <section>
        <h2 className="section-title">热门帖子</h2>
        <div className="grid cols-3">
          {communityPosts.map((post) => (
            <CommunityPostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CommunitiesPage;
