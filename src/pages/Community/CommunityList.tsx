import { useState } from 'react';
import { useParams } from 'react-router-dom';
import CommunityTitle from '@/components/community/CommunityTitle';
import CommunityNewPostButton from '@/components/community/CommunityNewPostButton';
import ViewToggleButton from '@/components/community/ViewToggleButton';
import PostList from '@/components/community/PostList';
import { dummyPosts } from '@/constants/dummyPosts';
import { PostType } from '@/types/Post';

const CommunityList = () => {
  const { type } = useParams<{ type: PostType }>();
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

  // 현재 게시판 타입에 맞는 글만 필터링
  const filteredPosts = dummyPosts.filter((post) => post.type === type);

  // 최신순 정렬
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortType === 'recent') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      return (b.likes ?? 0) - (a.likes ?? 0);
    }
  });

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
      {type && (
        <PostList
          posts={sortedPosts}
          viewType={viewType}
          boardType={type}
        />
      )}

      {/* 글쓰기 버튼 */}
      {type !== 'notice' && type && (
        <div className="fixed bottom-8 right-8 z-50">
          <CommunityNewPostButton to={getWritePageLink()} postType={type} />
        </div>
      )}
    </div>
  );
};

export default CommunityList;
