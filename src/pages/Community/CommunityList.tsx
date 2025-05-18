import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getCommunityList } from '@/apis/communityApi';
import { PostType, toServerPostType, getPostTypeLabel } from '@/types/Post';
import PostList from '@/components/community/PostList';
import ViewToggleButton from '@/components/community/ViewToggleButton';
import CommunityTitle from '@/components/community/CommunityTitle';
import CommunityNewPostButton from '@/components/community/CommunityNewPostButton';

const VALID_TYPES: PostType[] = ['emotion', 'notice', 'question'];

const CommunityList = () => {
  const { type } = useParams<{ type: PostType }>();
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [sortType, setSortType] = useState<'recent' | 'popular'>('recent');

  if (!type || !VALID_TYPES.includes(type)) {
    return <p className="text-center pt-10 text-red-500">잘못된 게시판 접근입니다.</p>;
  }

  const { data, isLoading } = useQuery({
    queryKey: ['communityList', type, sortType],
    queryFn: () => getCommunityList({ type: toServerPostType(type), page: 1, size: 50 }),
    enabled: true,
    retry: 1,
    staleTime: 1000 * 60,
  });

  const posts = data?.results ?? [];

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortType === 'recent') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return (b.likes ?? 0) - (a.likes ?? 0);
  });

  return (
    <div className="relative w-full max-w-[800px] mx-auto px-4 sm:px-6">
      <CommunityTitle title={getPostTypeLabel(type)} />

      {/* 정렬/뷰토글 */}
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

      {isLoading ? (
        <p className="text-center pt-10">불러오는 중...</p>
      ) : (
        <PostList posts={sortedPosts} viewType={viewType} boardType={type} />
      )}

      <div className="fixed bottom-8 right-8 z-50">
        <CommunityNewPostButton to={`/community/${type}/write`} postType={type} />
      </div>
    </div>
  );
};

export default CommunityList;
