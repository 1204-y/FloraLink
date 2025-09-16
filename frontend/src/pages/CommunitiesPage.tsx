import CommunityGroupCard from '../components/CommunityGroupCard';
import CommunityPostCard from '../components/CommunityPostCard';
import { communityGroups, communityPosts } from '../data/mockData';

const CommunitiesPage = () => {
  return (
    <>
      <section className="section">
        <div className="section__header">
          <h2>圈子广场</h2>
          <p className="muted">
            按地域、品种、主题聚集同好，参与话题、线下活动和苗木交换。
          </p>
        </div>
      </section>

      <section className="section">
        <div className="grid grid--3">
          {communityGroups.map((group) => (
            <CommunityGroupCard key={group.id} group={group} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>热门帖子</h2>
          <p className="muted">围观大家的养护心得与灵感交换。</p>
        </div>
        <div className="grid grid--3">
          {communityPosts.map((post) => (
            <CommunityPostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </>
  );
};

export default CommunitiesPage;
