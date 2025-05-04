import { format } from 'date-fns';
import { PostCardProps } from '../../types/Post';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye } from 'lucide-react';
import AuthorInfo from './AuthorInfo';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';
import IconWrapper from './IconWrapper';

interface ExtendedProps extends PostCardProps {
  onLikeToggle?: () => void;
  onCommentClick?: () => void;
}

const PostCard = ({ post, onLikeToggle, onCommentClick }: ExtendedProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isInDetailPage = location.pathname.startsWith('/community/');

  const handleCardClick = () => {
    if (!isInDetailPage) navigate(`/community/${post.id}`);
  };

  const { title, imageUrl, content, createdAt, likes, comments, views, author } = post;
  const formattedDate = format(new Date(createdAt), 'yyyy.MM.dd HH:mm');

  return (
    <div onClick={handleCardClick} className="w-full max-w-[800px] mx-auto px-4 sm:px-6 py-8 cursor-pointer">
      <div className="border bg-white rounded-lg p-[30px] shadow-sm">
        {/* 작성자/작성일 */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <AuthorInfo author={author} />
            <span className="text-xs text-primary-500 ml-2">{formattedDate}</span>
          </div>
        </div>

        {/* 제목 */}
        <h2 className="text-xl font-semibold text-gray-800 mb-3">{title}</h2>

        {/* 이미지 */}
        {imageUrl && (
          <div className="relative flex items-center justify-center w-full bg-gray-200 rounded mb-6 h-auto sm:h-[400px]">
            <img src={imageUrl} alt="게시물 이미지" className="w-full sm:w-auto h-auto sm:h-full object-cover" />
          </div>
        )}

        {/* 내용 */}
        <p className="text-gray-700 mb-6 whitespace-pre-line">{content}</p>

        {/* 좋아요/댓글/조회수 (조회수는 상세에서만 노출) */}
        <div className="flex items-center justify-between text-gray-400 text-xs mt-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <LikeButton size={14} onToggle={onLikeToggle} />
              <span className="text-primary-500">{likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <CommentButton size={14} onClick={onCommentClick} />
              <span className="text-primary-500">{comments}</span>
            </div>
          </div>
          {isInDetailPage ? (
            <div className="flex items-center gap-1 text-gray-400 text-xs cursor-default select-none">
              <IconWrapper icon={Eye} size={14} className="pointer-events-none" />
              <span className="text-primary-500">{views}</span>
            </div>
          ) : (
            <div className="w-[40px]" />
          )}
        </div>

        {/* 댓글 영역 */}
        {isInDetailPage && (
          <div className="mt-6 border-t pt-4">
            <p className="text-sm text-gray-500">💬 댓글 영역입니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
