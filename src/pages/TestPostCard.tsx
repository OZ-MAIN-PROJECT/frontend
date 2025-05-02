import { dummyPosts } from '../constants/dummyPosts';
import PostCard from '../components/community/PostCard';

const TestPostCard = () => {
  return (
    <div className="w-full max-w-[800px] mx-auto px-4 sm:px-6 space-y-6 py-8">
      {dummyPosts.map(post => (
        <PostCard
          post={post}
          onLikeToggle={() => console.log('좋아요 눌림')}
          onCommentClick={() => console.log('댓글 버튼 눌림')}
        />
      ))}
    </div>
  );
};

export default TestPostCard;
