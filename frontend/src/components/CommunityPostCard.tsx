import { CommunityPost } from '../types';

interface CommunityPostCardProps {
  post: CommunityPost;
}

const CommunityPostCard = ({ post }: CommunityPostCardProps) => {
  return (
    <div className="card">
      <div className="post-header">
        <img className="avatar-sm" src={post.avatar} alt={post.author} />
        <div>
          <strong>{post.author}</strong>
          <p className="muted">
            {post.group} · {post.createdAt}
          </p>
        </div>
      </div>
      <h3 className="card-title">{post.title}</h3>
      <p className="muted">{post.excerpt}</p>
      <div className="post-meta">
        <span>👍 {post.reactions}</span>
        <span>💬 {post.comments}</span>
        <button className="action-button">查看讨论</button>
      </div>
    </div>
  );
};

export default CommunityPostCard;
