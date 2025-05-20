import { useInfiniteQuery } from '@tanstack/react-query';
import { getCommunityList } from '@/apis/communityApi';
import { CommunityListResponse, PostType, toServerPostType } from '@/types/Post';

export const useInfiniteScrollCommunity = (type: PostType, sortType: 'recent' | 'popular') => {
  return useInfiniteQuery<CommunityListResponse, Error>({
    queryKey: ['communityList', type, sortType],
    queryFn: ({ pageParam = 1 }) =>
      getCommunityList({ type: toServerPostType(type), page: pageParam as number, size: 5 }),
    getNextPageParam: lastPage => (lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined),
    initialPageParam: 1,
    enabled: !!type,
  });
};
