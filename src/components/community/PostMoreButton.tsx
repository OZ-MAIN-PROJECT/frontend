import { Pencil, Trash2 } from 'lucide-react';
import { Post } from '@/types/Post';
import MoreDropdown from './MoreDropdown';
import IconWrapper from './IconWrapper';

interface PostMoreButtonProps {
  postData: Post;
  onEdit: () => void;
  onDelete: () => void;
}

const PostMoreButton = ({ onEdit, onDelete }: Omit<PostMoreButtonProps, 'postData'>) => {
  const menuItems = [
    {
      label: '수정',
      icon: <IconWrapper icon={Pencil} size={16} color="#888888" />,
      onClick: onEdit,
    },
    {
      label: '삭제',
      icon: <IconWrapper icon={Trash2} size={16} color="#f87171" />,
      color: 'text-red-400',
      onClick: onDelete,
    },
  ];

  return <MoreDropdown menuItems={menuItems} hasIcon={true} type="post" />;
};

export default PostMoreButton;
