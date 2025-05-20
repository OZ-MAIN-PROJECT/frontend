import CommunityListHeader from '@/components/community/CommunityListHeader';
import { useNavigate, useParams } from 'react-router-dom';
import MyPostList from './components/MyPostList';
import { MyPostType } from '@/types/auth';
import { useState } from 'react';
import { SortType, ViewType } from '@/types/Post';

const MyPostsPage = () => {
  const { type } = useParams<{ type: MyPostType }>();
  const navigate = useNavigate();

  const [viewType, setViewType] = useState<ViewType>('grid');
  const [sortType, setSortType] = useState<SortType>('recent');

  if (type !== 'written' && type !== 'liked') {
    navigate('/*'); // 404 에러 처리
    return;
  }

  return (
    <div className="relative w-full max-w-[800px] mx-auto px-4 sm:px-6">
      <CommunityListHeader
        title={type === 'written' ? '내가 작성한 글' : '좋아요 표시한 글'}
        controls={{ viewType, sortType }}
        onViewTypeChange={setViewType}
        onSortTypeChange={setSortType}
      />
      {/* 게시글 리스트 출력 */}
      <MyPostList type={type} controls={{ viewType, sortType }} />
    </div>
  );
};

export default MyPostsPage;
