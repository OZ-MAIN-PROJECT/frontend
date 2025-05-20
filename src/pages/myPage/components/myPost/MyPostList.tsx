import PostCard from '@/components/community/PostCard';
import { useFetchMyPosts } from '@/hooks/myPage/useFetchMyPosts';
import Pagination from '@/pages/Wallet/components/Pagenation';
import { MyPostType } from '@/types/auth';
import { sortPosts } from '@/utils/communityUtils';
import { useMemo } from 'react';

interface MyPostListProps {
  type: MyPostType;
  controls: {
    viewType: 'grid' | 'list';
    sortType: 'recent' | 'popular';
  };
  currentPage: number;
  onPageChange: (page: number) => void;
}

const MyPostList = ({ type, controls, currentPage, onPageChange }: MyPostListProps) => {
  const { posts, totalPages, loading } = useFetchMyPosts(type, currentPage, 10);

  const sortedPosts = useMemo(() => {
    return sortPosts(posts, controls.sortType);
  }, [posts, controls.sortType]);

  return (
    <div>
      {loading ? (
        <p>로딩중...</p>
      ) : (
        <>
          <div className={controls.viewType === 'grid' ? 'grid grid-cols-1 gap-2' : 'flex flex-col gap-2'}>
            {sortedPosts.map(post => (
              <PostCard key={post.id} post={post} viewType={controls.viewType} onCommentClick={() => {}} />
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          )}
        </>
      )}
    </div>
  );
  
};

export default MyPostList;
