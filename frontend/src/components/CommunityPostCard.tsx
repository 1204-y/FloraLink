import { motion } from 'framer-motion';
import { Heart, MessageCircle } from 'lucide-react';
import { CommunityPost } from '../types';
import { cardMotion } from './motionPresets';

interface CommunityPostCardProps {
  post: CommunityPost;
}

const CommunityPostCard = ({ post }: CommunityPostCardProps) => {
  const createdAt = new Date(post.created_at).toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
  const excerpt = post.content.length > 120 ? `${post.content.slice(0, 117)}…` : post.content;

  return (
    <motion.div className="card community-post" {...cardMotion}>
      <p className="muted">{createdAt}</p>
      <h3>{post.title}</h3>
      <p className="muted">{excerpt || '这篇帖子还没有正文，期待你的补充。'}</p>
      <div className="community-post__meta">
        <span>
          <Heart size={16} strokeWidth={1.8} /> 热度筹备中
        </span>
        <span>
          <MessageCircle size={16} strokeWidth={1.8} /> 欢迎评论
        </span>
        <button className="action-button action-button--ghost" type="button">
          查看讨论
        </button>
      </div>
    </motion.div>
  );
};

export default CommunityPostCard;
