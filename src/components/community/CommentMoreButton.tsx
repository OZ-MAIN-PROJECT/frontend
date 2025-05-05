import { Ellipsis } from 'lucide-react';

interface CommentMoreButtonProps {
  onClick?: () => void;
  className?: string;
}

const CommentMoreButton = ({ onClick, className }: CommentMoreButtonProps) => {
  return (
    <button
      onClick={onClick}
      aria-label="댓글 옵션 더보기"
      className={`p-1 rounded-md hover:bg-gray-100 transition ${className}`}
    >
      <Ellipsis size={14} color="#9ca3af" />
    </button>
  );
};

export default CommentMoreButton;
