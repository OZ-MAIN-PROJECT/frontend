import MoreDropdown from './MoreDropdown';

interface CommentMoreButtonProps {
  onEdit: () => void;
  onDelete: () => void;
}

const CommentMoreButton = ({ onEdit, onDelete }: CommentMoreButtonProps) => {
  const menuItems = [
    { label: '수정', onClick: onEdit },
    { label: '삭제', onClick: onDelete, color: 'text-red-400' },
  ];

  return <MoreDropdown menuItems={menuItems} hasIcon={false} type="comment" />;
};

export default CommentMoreButton;
