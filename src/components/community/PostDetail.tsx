import { useParams, useNavigate } from 'react-router-dom';
import { dummyPosts } from '../../constants/dummyPosts';
import { format } from 'date-fns';
import { Eye } from 'lucide-react';
import AuthorInfo from './AuthorInfo';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';
import IconWrapper from './IconWrapper';
import CommentList from './CommentList';
import PostMoreButton from './PostMoreButton';
import CommunityTitle from './CommunityTitle';

const PostDetail = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const post = dummyPosts.find(p => p.id === postId);

  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  const { title, imageUrl, content, createdAt, likes, comments, views, author, isMine } = post;
  const formattedDate = format(new Date(createdAt), 'yyyy.MM.dd HH:mm');

  const handleEdit = () => {
    const confirmed = window.confirm('게시글을 수정하시겠습니까?');
    if (!confirmed) return;

    navigate('/community/write', {
      state: {
        isEdit: true,
        postData: post,
      },
    });
  };

  const handleDelete = () => {
    const confirmed = window.confirm('정말로 이 게시글을 삭제하시겠습니까?');
    if (!confirmed) return;

    // 실제 삭제 API 연결 예정
    console.log('게시글 삭제:', post.id);
  };
  
  return (
    <div className="w-full max-w-[800px] mx-auto px-4 sm:px-6">
      <CommunityTitle title="감정 소비 이야기" />

      <div className="border bg-white rounded-lg p-[30px] shadow-sm dark:bg-white/10 dark:border-none">
        {/* 작성자/작성일/더보기 */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <AuthorInfo author={author} />
            <span className="text-xs text-primary-500 ml-2">{formattedDate}</span>
          </div>
          {isMine && (
            <div className="relative">
              <PostMoreButton onEdit={handleEdit} onDelete={handleDelete} />
            </div>
          )}
        </div>
        {/* 제목 */}
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">{title}</h2>
        {/* 이미지 */}
        {imageUrl && (
          <div className="relative flex items-center justify-center w-full bg-gray-200 rounded mb-6 h-auto sm:h-[400px]">
            <img src={imageUrl} alt="게시물 이미지" className="w-full sm:w-auto h-auto sm:h-full object-cover" />
          </div>
        )}

        {/* 내용 */}
        <p className="text-gray-700 dark:text-dark-500 mb-6 whitespace-pre-line">{content}</p>
        {/* 좋아요/댓글/조회수 */}
        <div className="flex items-center justify-between text-gray-400 text-xs mt-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <LikeButton size={14} onToggle={() => console.log('좋아요')} />
              <span className="text-primary-500">{likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <CommentButton size={14} onClick={() => console.log('댓글')} />
              <span className="text-primary-500">{comments}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-gray-400 text-xs cursor-default select-none">
            <IconWrapper icon={Eye} size={14} className="pointer-events-none" />
            <span className="text-primary-500">{views}</span>
          </div>
        </div>

        {/* 댓글 영역 */}
        <div className="pt-4">
          <CommentList />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
