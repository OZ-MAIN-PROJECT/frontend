import PostCard from './PostCard';
import { Post, PostType } from '@/types/Post';

interface PostListProps {
  posts: Post[];
  viewType: 'grid' | 'list';
  boardType: PostType;
}

const PostList = ({ posts, viewType, boardType }: PostListProps) => {
  if (posts.length === 0) {
    return <p className="text-center text-[16px] text-gray-600 pt-10">게시글이 없습니다.</p>;
  }

  // 공지사항이면 고정글/일반글 분리해서 출력
  if (boardType === 'notice') {
    const pinnedPosts = posts.filter(post => post.isPinned);
    const normalPosts = posts.filter(post => !post.isPinned);

    return (
      <>
        {/* 고정글 출력 */}
        {pinnedPosts.length > 0 && (
          <div className="mb-6">
            {pinnedPosts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                viewType={viewType}
                onLikeToggle={() => {}}
                onCommentClick={() => {}}
              />
            ))}
          </div>
        )}

        {/* 일반글 출력 */}
        <div className={`grid ${viewType === 'grid' ? 'grid-cols-1 gap-2' : 'flex flex-col gap-6'}`}>
          {normalPosts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              viewType={viewType}
              onLikeToggle={() => {}}
              onCommentClick={() => {}}
            />
          ))}
        </div>
      </>
    );
  }

  // 다른 게시판은 그냥 출력
  return (
    <div className={`grid ${viewType === 'grid' ? 'grid-cols-1 gap-2' : 'flex flex-col gap-6'}`}>
      {posts.map(post => (
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
