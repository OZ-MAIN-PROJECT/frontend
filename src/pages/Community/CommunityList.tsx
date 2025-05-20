import { useNavigate, useParams } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState, useRef, useEffect } from 'react';
import { getCommunityList } from '@/apis/communityApi';
import { PostType, toServerPostType, getPostTypeLabel, CommunityListResponse, ViewType } from '@/types/Post';
import PostList from '@/components/community/PostList';
import ViewToggleButton from '@/components/community/ViewToggleButton';
import CommunityTitle from '@/components/community/CommunityTitle';
import CommunityNewPostButton from '@/components/community/CommunityNewPostButton';
import { PostCardSkeleton } from '@/components/common/SkeletonModels';

const VALID_TYPES: PostType[] = ['emotion', 'notice', 'question'];

const CommunityList = () => {
  const { type: rawType } = useParams<{ type: PostType }>();
  const [viewType, setViewType] = useState<ViewType>('grid');
  const [sortType, setSortType] = useState<'recent' | 'popular'>('recent');
  const observerRef = useRef<HTMLDivElement | null>(null);

  const type = VALID_TYPES.includes(rawType as PostType) ? (rawType as PostType) : null;

  const navigate = useNavigate();

  useEffect(() => {
    if (!type) navigate('/*');
  }, [type, navigate]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery<
    CommunityListResponse,
    Error
  >({
    queryKey: ['communityList', type, sortType],
    queryFn: ({ pageParam = 1 }) =>
      getCommunityList({ type: toServerPostType(type ?? 'emotion'), page: pageParam as number, size: 5 }),
    getNextPageParam: lastPage => (lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined),
    initialPageParam: 1,
    enabled: !!type,
  });

  const posts = data?.pages.flatMap(page => page.results) ?? [];

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortType === 'recent') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return (b.likes ?? 0) - (a.likes ?? 0);
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (!type) return null;

  return (
    <div className="relative w-full max-w-[800px] mx-auto px-4 sm:px-6">
      <CommunityTitle title={getPostTypeLabel(type)} />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm text-primary-500">
          <button
            className={`${sortType === 'recent' ? 'font-semibold text-primary-800 dark:text-primary-300' : ''}`}
            onClick={() => setSortType('recent')}
          >
            최신순
          </button>
          <span className="text-gray-400">·</span>
          <button
            className={`${sortType === 'popular' ? 'font-semibold text-primary-800 dark:text-primary-300' : ''}`}
            onClick={() => setSortType('popular')}
          >
            인기순
          </button>
        </div>
        <ViewToggleButton viewType={viewType} onChange={setViewType} />
      </div>

      {isLoading ? (
        <PostCardSkeleton viewType={viewType} />
      ) : (
        <PostList posts={sortedPosts} viewType={viewType} boardType={type} />
      )}

      <div ref={observerRef} />
      {isFetchingNextPage && (
        <div className="mt-2">
          <PostCardSkeleton viewType={viewType} />{' '}
        </div>
      )}

      <div className="fixed bottom-8 right-8 z-50">
        <CommunityNewPostButton to={`/community/${type}/write`} postType={type} />
      </div>
    </div>
  );
};

export default CommunityList;
