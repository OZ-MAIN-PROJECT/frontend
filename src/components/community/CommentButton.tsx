import { MessageSquare } from 'lucide-react';
import IconWrapper from './IconWrapper';

interface CommentButtonProps {
  onClick?: () => void;
  size?: number;
  className?: string;
}

const CommentButton = ({ onClick, size = 20, className }: CommentButtonProps) => {
  return (
    <IconWrapper
      icon={MessageSquare}
      size={size}
      fill={'#9ca3af'}
      onClick={onClick}
      className={className}
      ariaLabel="댓글"
    />
  );
};

export default CommentButton;
