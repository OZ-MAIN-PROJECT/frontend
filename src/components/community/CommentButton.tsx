import { MessageSquare } from 'lucide-react';
import IconWrapper from './IconWrapper';

interface CommentButtonProps {
  onClick?: () => void;
  size?: number;
  color?: string;
  className?: string;
}

const CommentButton = ({ onClick, size = 20, color = '#9ca3af', className }: CommentButtonProps) => {
  return (
    <IconWrapper
      icon={MessageSquare}
      size={size}
      color={color}
      onClick={onClick}
      className={className}
      ariaLabel="댓글"
    />
  );
};

export default CommentButton;
