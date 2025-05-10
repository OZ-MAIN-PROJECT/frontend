import { useState } from 'react';
import { useParams } from 'react-router-dom';
import CommunityTitle from '@/components/community/CommunityTitle';
import CommunityNewPostButton from '@/components/community/CommunityNewPostButton';
import ViewToggleButton from '@/components/community/ViewToggleButton';
import PostCard from '@/components/community/PostCard';
import { dummyPosts } from '@/constants/dummyPosts';

const CommunityList = () => {
  const { type } = useParams();
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [sortType, setSortType] = useState<'recent' | 'popular'>('recent');

  const getBoardTitle = () => {
    switch (type) {
      case 'question':
        return '질문 게시판';
      case 'emotion':
        return '감정 소비 이야기';
      case 'notice':
        return '공지사항';
      default:
        return '알 수 없는 게시판';
    }
  };

  const getWritePageLink = () => {
    if (type === 'notice') {
      return '/community/notice/write';
    }
    return '/community/write';
  };

  return (
    <div className="relative w-full max-w-[800px] mx-auto px-4 sm:px-6">
      <CommunityTitle title={getBoardTitle()} />

      {/* 정렬 및 뷰토글 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm text-primary-500">
          <button
            className={`${sortType === 'recent' ? 'font-semibold text-primary-800' : ''}`}
            onClick={() => setSortType('recent')}
          >
            최신순
          </button>
          <span className="text-gray-400">·</span>
          <button
            className={`${sortType === 'popular' ? 'font-semibold text-primary-800' : ''}`}
            onClick={() => setSortType('popular')}
          >
            인기순
          </button>
        </div>

        <ViewToggleButton viewType={viewType} onChange={setViewType} />
      </div>

      {/* 게시글 목록 */}
    <div className={viewType === 'grid' ? 'grid grid-cols-1 gap-3' : 'flex flex-col gap-5'}>
        {dummyPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            viewType={viewType}
            onLikeToggle={() => console.log('좋아요')}
            onCommentClick={() => console.log('댓글')}
          />
        ))}
      </div>

      {/* 글쓰기 버튼 */}
      {type !== 'notice' && type && (
        <div className="fixed bottom-8 right-8 z-50">
          <CommunityNewPostButton to={getWritePageLink()} postType={type as 'emotion' | 'question' | 'notice'} />
        </div>
      )}
    </div>
  );
};

export default CommunityList;