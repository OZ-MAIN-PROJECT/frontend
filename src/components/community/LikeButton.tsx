import { Heart } from 'lucide-react';

interface LikeButtonProps {
  isLiked: boolean;
  likes: number;
  onClick?: () => void;
}

const LikeButton = ({ isLiked, likes, onClick }: LikeButtonProps) => {
  return (
    <>
      <Heart
        size={20}
        stroke="none"
        fill={isLiked ? '#ef4444' : '#9ca3af'}
        onClick={e => {
          e.stopPropagation();
          onClick?.();
        }}
      />
      <span className="text-primary-500">{likes}</span>
    </>
  );
};

export default LikeButton;
