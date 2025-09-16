import type { MotionProps } from 'framer-motion';

export const cardMotion: MotionProps = {
  whileHover: {
    y: -8,
    boxShadow: '0 28px 52px rgba(39, 66, 49, 0.18)'
  },
  whileTap: {
    y: -2
  },
  transition: {
    duration: 0.28,
    ease: 'easeOut'
  }
};
