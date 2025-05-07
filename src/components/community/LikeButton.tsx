import { Heart } from 'lucide-react';
import { useState } from 'react';
import IconWrapper from './IconWrapper';

interface LikeButtonProps {
  defaultLiked?: boolean;
  onToggle?: (liked: boolean) => void;
  size?: number;
}

const LikeButton = ({ defaultLiked = false, onToggle, size = 20 }: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(defaultLiked);
  const handleClick = () => {
    const next = !isLiked;
    setIsLiked(next);
    onToggle?.(next);
  };

  return (
    <IconWrapper
      icon={Heart}
      size={size}
      fill={isLiked ? '#ef4444' : '#9ca3af'}
      color="none"
      onClick={handleClick}
      ariaLabel="좋아요"
    />
  );
};

export default LikeButton;
