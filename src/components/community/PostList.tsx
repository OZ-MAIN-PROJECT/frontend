import PostCard from './PostCard';
import { Post, PostType } from '@/types/Post';
import { usePostStatsStore } from '@/stores/usePostStatsStore';

interface PostListProps {
  posts: Post[];
  viewType: 'grid' | 'list';
  boardType: PostType;
}

const PostList = ({ posts, viewType }: PostListProps) => {
  if (posts.length === 0) {
    return <p className="text-center text-[16px] text-gray-600 pt-10">게시글이 없습니다.</p>;
  }

  const postStats = usePostStatsStore(state => state.postStats);

  return (
    <div className={viewType === 'grid' ? 'grid grid-cols-1 gap-2' : 'flex flex-col gap-2'}>
      {posts.map(post => {
        const { views = 0, comments = 0 } = postStats[post.id] || {};
        return (
          <PostCard
            key={post.id}
            post={{ ...post, views, comments }}
            viewType={viewType}
            onLikeToggle={() => {}}
            onCommentClick={() => {}}
          />
        );
      })}
    </div>
  );
};

export default PostList;
