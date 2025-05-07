import { dummyPosts } from '../constants/dummyPosts';
import PostCard from '../components/community/PostCard';
import CommunityTitle from '@/components/community/CommunityTitle';

const TestPostCard = () => {
  return (
    <div className="w-full mx-auto max-w-[800px] px-4 sm:px-6">
      <CommunityTitle title="감정 소비 이야기" />
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
