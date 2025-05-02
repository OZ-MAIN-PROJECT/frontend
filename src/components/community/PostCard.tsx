import { format } from 'date-fns';
import { PostCardProps } from '../../types/Post';
import AuthorInfo from './AuthorInfo';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';

interface ExtendedProps extends PostCardProps {
  onLikeToggle?: () => void;
  onCommentClick?: () => void;
}

const PostCard = ({ post, onLikeToggle, onCommentClick }: ExtendedProps) => {
  const { title, imageUrl, content, createdAt, likes, comments, author } = post;
  const formattedDate = format(new Date(createdAt), 'yyyy.MM.dd HH:mm');

  return (
    <div className="border bg-white rounded-lg p-[30px] shadow-sm">
      {/* 작성자 */}
      <div className="flex items-center mb-4">
        <AuthorInfo author={author} />
      </div>

      {/* 제목 */}
      <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>

      {/* 이미지 */}
      {imageUrl && (
        <div className="relative flex items-center justify-center w-full bg-gray-200 rounded mb-6 h-auto sm:h-[400px]">
          <img src={imageUrl} alt="게시물 이미지" className="w-full sm:w-auto h-auto sm:h-full object-cover" />
        </div>
      )}

      {/* 내용 */}
      <p className="text-gray-700 text-sm mb-6">{content}</p>

      {/* 작성일, 좋아요, 댓글 버튼 */}
      <div className="flex items-center text-gray-400 text-xs gap-4 mt-2">
        <div className="text-primary-500">{formattedDate}</div>
        <div className="flex items-center gap-1">
          <LikeButton size={14} onToggle={onLikeToggle} />
          <span className="text-primary-500">{likes}</span>
        </div>
        <div className="flex items-center gap-1">
          <CommentButton size={14} onClick={onCommentClick} />
          <span className="text-primary-500">{comments}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
