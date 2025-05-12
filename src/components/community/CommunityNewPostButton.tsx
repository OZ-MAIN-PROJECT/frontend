import { useNavigate } from 'react-router-dom';
import { PenLine } from 'lucide-react';
import IconButton from '@/components/common/IconButton';

interface CommunityNewPostProps {
  to: string;
  postType: 'emotion' | 'question' | 'notice';
}

const CommunityNewPostButton = ({ to, postType }: CommunityNewPostProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to, { state: { type: postType } });
  };

  return (
    <IconButton
      icon={PenLine}
      onClick={handleClick}
      ariaLabel="커뮤니티 글 작성하기"
    />
  );
};

export default CommunityNewPostButton;
