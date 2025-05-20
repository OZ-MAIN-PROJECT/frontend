import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { PostCardProps } from '@/types/Post';
import IconWrapper from './IconWrapper';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';
import AuthorInfo from './AuthorInfo';
import { Eye } from 'lucide-react';
import { useLike } from '@/hooks/useLike';
import altImage from '@/assets/images/altImage.png';

interface ExtendedProps extends PostCardProps {
  viewType: 'list' | 'grid';
  onCommentClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const PostCard = ({ post, viewType, onCommentClick }: ExtendedProps) => {
  const navigate = useNavigate();
  const formattedDate = format(new Date(post.createdAt), 'yyyy.MM.dd HH:mm');
  const isNotice = post.type === 'notice';

  const { isLiked, likes, toggleLike } = useLike(post?.isLiked ?? false, post?.likes ?? 0, post?.id ?? '');

  return (
    <div
      className={`w-full bg-white rounded-lg border p-5 shadow-sm cursor-pointer ${
        viewType === 'list' ? 'flex flex-col gap-2' : 'flex flex-col gap-4'
      }`}
      onClick={() => navigate(`/community/${post.type}/${post.id}`, { state: { type: post.type } })}
    >
      <div className="text-xs text-primary-500 flex items-center gap-2">
        <AuthorInfo author={post.author} />
        <span className="ml-2">{formattedDate}</span>
      </div>

      {viewType === 'list' ? (
        <div className="flex gap-4 items-start">
          <div className="flex flex-col flex-1 gap-2">
            <h2 className="text-base font-semibold text-gray-800 line-clamp-1">{post.title}</h2>
            <p className="text-gray-700 text-sm line-clamp-2">{post.content}</p>
          </div>
          <div className="flex-shrink-0 rounded-md overflow-hidden w-[100px] h-[100px]">
            {post.imageUrl && (
              <img src={post.imageUrl || altImage} alt="게시글 이미지" className="w-full h-full object-cover" />
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-gray-800 line-clamp-1">{post.title}</h2>
          {post.imageUrl && (
            <div className="rounded-md overflow-hidden w-full">
              <img src={post.imageUrl} alt="게시글 이미지" className="w-full object-contain max-h-[400px]" />
            </div>
          )}
          <p className="text-gray-700 text-sm line-clamp-2">{post.content}</p>
        </div>
      )}

      <div className="flex items-center gap-4 text-xs text-primary-500 mt-2">
        <div className="flex items-center gap-1">
          <LikeButton isLiked={isLiked} likes={likes} onClick={toggleLike} />
        </div>
        {!isNotice && (
          <div className="flex items-center gap-1">
            <CommentButton size={14} onClick={onCommentClick} />
            <span>{post.comments}</span>
          </div>
        )}
        <div className="flex items-center gap-1 ml-auto text-gray-400">
          <IconWrapper icon={Eye} size={14} />
          <span>{post.views}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
