import PostCard from '@/components/community/PostCard';
import { useFetchMyPosts } from '@/hooks/myPage/useFetchMyPosts';
import { MyPostType } from '@/types/auth';
import { sortPosts } from '@/utils/communityUtils';
import { useMemo } from 'react';

interface MyPostListProps {
  type: MyPostType;
  controls: {
    viewType: 'grid' | 'list';
    sortType: 'recent' | 'popular';
  };
}

const MyPostList = ({ type, controls }: MyPostListProps) => {
  const { postList, loading } = useFetchMyPosts(type);

  const sortedPosts = useMemo(()=>{
    return sortPosts(postList, controls.sortType);
  }, [postList, controls.sortType])

  return (
    <>
      {loading ? (
        <p>로딩중...</p>
      ) : (
        <div className={controls.viewType === 'grid' ? 'grid grid-cols-1 gap-2' : 'flex flex-col gap-2'}>
          {sortedPosts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              viewType={controls.viewType}
              onLikeToggle={() => {}}
              onCommentClick={() => {}}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default MyPostList;
