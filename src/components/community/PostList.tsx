import PostCard from './PostCard';
import { Post } from '@/types/Post';

interface PostListProps {
  posts: Post[];
  onClickPost?: (postId: string) => void;
}

const PostList = ({ posts, onClickPost }: PostListProps) => {
  if (posts.length === 0) {
    return <p className="text-center text-gray-500">게시글이 없습니다.</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onLikeToggle={() => {}}
          onCommentClick={() => {}}
        />
      ))}
    </div>
  );
};

export default PostList;
