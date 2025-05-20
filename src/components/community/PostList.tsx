import PostCard from './PostCard';
import { Post, PostType } from '@/types/Post';

interface PostListProps {
  posts: Post[];
  viewType: 'grid' | 'list';
  boardType: PostType;
}

const PostList = ({ posts, viewType }: PostListProps) => {
  if (posts.length === 0) {
    return <p className="text-center text-[16px] text-gray-600 pt-10">게시글이 없습니다.</p>;
  }

  return (
    <div className={viewType === 'grid' ? 'grid grid-cols-1 gap-2' : 'flex flex-col gap-2'}>
      {posts.map(post => (
        <PostCard key={post.id} post={post} viewType={viewType} onCommentClick={() => {}} />
      ))}
    </div>
  );
};

export default PostList;
