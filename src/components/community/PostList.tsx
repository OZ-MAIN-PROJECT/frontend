import PostCard from './PostCard';
import { Post } from '@/types/Post';

interface PostListProps {
  posts: Post[];
  viewType: 'grid' | 'list';
}

const PostList = ({ posts, viewType }: PostListProps) => {
  if (posts.length === 0) {
    return <p className="text-center text-[16px] text-gray-600 pt-10">게시글이 없습니다.</p>;
  }

  return (
    <div className={`grid ${viewType === 'grid' ? 'grid-cols-1 gap-2' : 'flex flex-col gap-6'}`}>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          viewType={viewType}
          onLikeToggle={() => {}}
          onCommentClick={() => {}}
        />
      ))}
    </div>
  );
};

export default PostList;
