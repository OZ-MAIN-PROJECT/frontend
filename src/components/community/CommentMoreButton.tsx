import { useEffect, useState } from 'react';
import MoreDropdown from './MoreDropdown';

interface CommentMoreButtonProps {
  onEdit: () => void;
  onDelete: () => void;
  forceClose?: boolean;
}

const CommentMoreButton = ({ onEdit, onDelete, forceClose = false }: CommentMoreButtonProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (forceClose) {
      setOpen(false);
    }
  }, [forceClose]);

  const menuItems = [
    { label: '수정', onClick: onEdit },
    { label: '삭제', onClick: onDelete, color: 'text-red-400' },
  ];

  return (
    <MoreDropdown
      menuItems={menuItems}
      hasIcon={false}
      type="comment"
      open={open}
      setOpen={setOpen}
    />
  );
};

export default CommentMoreButton;