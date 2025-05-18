import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { PostCardProps } from '@/types/Post';
import IconWrapper from './IconWrapper';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';
import AuthorInfo from './AuthorInfo';
import { Eye } from 'lucide-react';
import { useAuthStore } from '@/stores/useAuthStore';
import PostMoreButton from './PostMoreButton';

interface ExtendedProps extends PostCardProps {
  viewType: 'list' | 'grid';
  onLikeToggle?: () => void;
  onCommentClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const PostCard = ({ post, viewType, onLikeToggle, onCommentClick, onEdit, onDelete }: ExtendedProps) => {
  const navigate = useNavigate();
  const formattedDate = format(new Date(post.createdAt), 'yyyy.MM.dd HH:mm');
  const { user } = useAuthStore();

  const isOwner = post.isOwner || user?.nickname === post.author.nickname;

  return (
    <div
      className={`w-full bg-white rounded-lg border p-5 shadow-sm cursor-pointer ${
        viewType === 'list' ? 'flex justify-between items-center gap-4' : 'flex flex-col gap-4'
      }`}
      onClick={() => navigate(`/community/${post.type}/${post.id}`, { state: { type: post.type } })}
    >
      <div className={`flex flex-col ${viewType === 'list' ? 'flex-1' : ''}`}>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AuthorInfo author={post.author} />
            <span className="text-xs text-primary-500 ml-2">{formattedDate}</span>
          </div>
          {isOwner && <PostMoreButton onEdit={onEdit ?? (() => {})} onDelete={onDelete ?? (() => {})} />}
        </div>

        <h2 className="text-base font-semibold text-gray-800 mt-1 line-clamp-1">{post.title}</h2>
        <p className="text-gray-700 text-sm line-clamp-2">{post.content}</p>
        <div className="flex items-center gap-4 text-xs text-primary-500 mt-2">
          <div className="flex items-center gap-1">
            <LikeButton size={14} onToggle={onLikeToggle} />
            <span>{post.likes}</span>
          </div>
          {post.type !== 'notice' && (
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
      {post.imageUrl && (
        <div className={`rounded-md overflow-hidden ${viewType === 'list' ? 'w-[100px] h-[100px]' : 'w-full'}`}>
          <img
            src={post.imageUrl}
            alt="게시글 이미지"
            className={viewType === 'list' ? 'w-full h-full object-cover' : 'w-full object-contain max-h-[400px]'}
          />
        </div>
      )}
    </div>
  );
};

export default PostCard;
