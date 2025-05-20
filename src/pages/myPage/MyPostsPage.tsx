import CommunityListHeader from '@/components/community/CommunityListHeader';
import { useParams } from 'react-router-dom';

const MyPostsPage = () => {
  const { type } = useParams(); // type은 'written' 또는 'liked'

  return (
    <div>
      <CommunityListHeader title={type === 'written' ? '내가 작성한 글' : '좋아요 표시한 글'} />
      {/* 게시글 리스트 출력 */}
    </div>
  );
};

export default MyPostsPage;
