import { motion } from 'framer-motion';
import { Heart, MessageCircle } from 'lucide-react';
import { CommunityPost } from '../types';
import { cardMotion } from './motionPresets';

interface CommunityPostCardProps {
  post: CommunityPost;
}

const CommunityPostCard = ({ post }: CommunityPostCardProps) => {
  return (
    <motion.div className="card community-post" {...cardMotion}>
      <div className="community-post__header">
        <img className="avatar-sm" src={post.avatar} alt={post.author} />
        <div>
          <strong>{post.author}</strong>
          <p className="muted">
            {post.group} · {post.createdAt}
          </p>
        </div>
      </div>
      <h3>{post.title}</h3>
      <p className="muted">{post.excerpt}</p>
      <div className="community-post__meta">
        <span>
          <Heart size={16} strokeWidth={1.8} /> {post.reactions}
        </span>
        <span>
          <MessageCircle size={16} strokeWidth={1.8} /> {post.comments}
        </span>
        <button className="action-button action-button--ghost">查看讨论</button>
      </div>
    </motion.div>
  );
};

export default CommunityPostCard;
