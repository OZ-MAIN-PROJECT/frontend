import { useNavigate, useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { Eye, Pin } from 'lucide-react'; // ★ 여기 Pin 추가
import { PostCardProps } from '@/types/Post';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';
import IconWrapper from './IconWrapper';
import AuthorInfo from './AuthorInfo';

interface ExtendedProps extends PostCardProps {
  viewType: 'list' | 'grid';
  onLikeToggle?: () => void;
  onCommentClick?: () => void;
}

const PostCard = ({ post, viewType, onLikeToggle, onCommentClick }: ExtendedProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { title, imageUrl, content, createdAt, likes, comments, views, author, isPinned } = post;
  const formattedDate = format(new Date(createdAt), 'yyyy.MM.dd HH:mm');

  const isInDetailPage =
    location.pathname.startsWith('/community/') &&
    location.pathname !== '/community/emotion' &&
    location.pathname !== '/community/question';

  const handleClick = () => {
    if (!isInDetailPage) navigate(`/community/${post.type}/${post.id}`);
  };

  if (viewType === 'list') {
    // 리스트 뷰
    return (
      <div
        className="w-full bg-white dark:bg-white/10 dark:border-none rounded-lg border p-5 shadow-sm flex justify-between items-center gap-4 cursor-pointer"
        onClick={handleClick}
      >
        {/* 왼쪽 텍스트 */}
        <div className="flex flex-col flex-1">
          <AuthorInfo author={author} />
          <h2 className="text-base font-semibold text-gray-800 dark:text-white mt-2 line-clamp-1">{title}</h2>
          <p className="text-gray-600 text-sm mt-1 line-clamp-2">{content}</p>
          <div className="flex items-center gap-6 text-primary-500 dark:text-dark-500 text-xs mt-3">
            <div className="flex items-center gap-1">
              <LikeButton size={14} onToggle={onLikeToggle} />
              <span>{likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <CommentButton size={14} onClick={onCommentClick} />
              <span>{comments}</span>
            </div>
            {isInDetailPage && (
              <div className="flex items-center gap-1 ml-auto text-gray-400">
                <IconWrapper icon={Eye} size={14} />
                <span>{views}</span>
              </div>
            )}
          </div>
        </div>

        {/* 오른쪽 썸네일 */}
        {imageUrl && (
          <div className="w-[100px] h-[100px] overflow-hidden rounded-md flex-shrink-0">
            <img src={imageUrl} alt="썸네일" className="object-cover w-full h-full" />
          </div>
        )}
      </div>
    );
  }

  // 피드 뷰
  return (
    <div
      className="w-full bg-white dark:bg-white/10 dark:border-none rounded-lg border p-5 shadow-sm flex flex-col gap-4 cursor-pointer"
      onClick={handleClick}
    >
      {/* 작성자/작성일 */}
      <div className="flex items-center gap-2">
        <AuthorInfo author={author} />
        <span className="text-xs text-primary-500 dark:text-dark-500">{formattedDate}</span>
      </div>

      {/* 제목 */}
      <div className="flex items-center justify-between">
        <h2
          className={`text-lg font-semibold ${
            post.type === 'notice' ? 'text-accent-red' : 'text-gray-800 dark:text-white'
          }`}
        >
          {title}
        </h2>
        {isPinned && (
          <IconWrapper
            icon={Pin}
            size={20}
            fill="#151d4a"
            color="#151d4a"
            className="rotate-45"
          />
        )}
      </div>

      {/* 이미지 */}
      {imageUrl && (
        <div
          className="w-full bg-gray-300 dark:bg-black flex items-center justify-center rounded-md overflow-hidden"
          style={{ maxHeight: '400px' }}
        >
          <img
            src={imageUrl}
            alt="본문 이미지"
            className="object-contain w-full max-h-[400px]"
          />
        </div>
      )}

      {/* 내용 */}
      <p className="text-gray-700 dark:text-dark-500 text-sm line-clamp-2">{content}</p>

      {/* 좋아요/댓글/조회수 */}
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
        {isInDetailPage && (
          <div className="flex items-center gap-1 text-gray-400 cursor-default select-none">
            <IconWrapper icon={Eye} size={14} className="pointer-events-none" />
            <span className="text-primary-500">{views}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
