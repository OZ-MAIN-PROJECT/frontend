import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Eye } from 'lucide-react';
import { deleteCommunityPost, getCommunityDetail } from '@/apis/communityApi';
import { PostType, getPostTypeLabel } from '@/types/Post';
import { useAuthStore } from '@/stores/useAuthStore';
import AuthorInfo from './AuthorInfo';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';
import IconWrapper from './IconWrapper';
import CommentList from './CommentList';
import PostMoreButton from './PostMoreButton';
import CommunityTitle from './CommunityTitle';
import CommunityNewPostButton from '@/components/community/CommunityNewPostButton';
import { useLike } from '@/hooks/useLike';
import { PostDetailSkeleton } from '../common/SkeletonModels';

const PostDetail = () => {
  const { postId, type } = useParams<{ postId: string; type: PostType }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { user } = useAuthStore();

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['postDetail', postId],
    queryFn: () => getCommunityDetail(postId!),
    enabled: !!postId,
  });

  const { isLiked, likes, toggleLike } = useLike(post?.isLiked ?? false, post?.likes ?? 0, post?.id ?? '');

  if (isLoading) return <PostDetailSkeleton />;
  if (isError || !post) return <p className="p-4">게시글을 찾을 수 없습니다.</p>;

  const { id, title, imageUrl, content, createdAt, comments, views, author } = post;
  const isOwner = post.isOwner || user?.nickname === author.nickname;
  const formattedDate = format(new Date(createdAt), 'yyyy.MM.dd HH:mm');

  const handleEdit = () => {
    if (!confirm('게시글을 수정하시겠습니까?')) return;
    navigate(`/community/${type}/write`, {
      state: {
        post,
        type,
      },
    });
  };

  const handleDelete = async () => {
    if (!confirm('정말로 이 게시글을 삭제하시겠습니까?')) return;

    try {
      await deleteCommunityPost(id);
      alert('게시글이 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['communityList'] });
      navigate(`/community/${type}`);
    } catch (error) {
      console.error(error);
      alert('게시글 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="w-full max-w-[800px] mx-auto px-4 sm:px-6">
      <CommunityTitle title={getPostTypeLabel(type!)} />

      <div className="border bg-white rounded-lg p-[30px] shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <AuthorInfo author={author} />
            <span className="text-xs text-primary-500 ml-2">{formattedDate}</span>
          </div>
          {isOwner && <PostMoreButton onEdit={handleEdit} onDelete={handleDelete} />}
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-3">{title}</h2>

        {imageUrl && (
          <div className="relative flex items-center justify-center w-full bg-gray-200 rounded mb-6 h-auto sm:h-[400px]">
            <img src={imageUrl} alt="게시물 이미지" className="w-full sm:w-auto h-auto sm:h-full object-cover" />
          </div>
        )}

        <p className="text-gray-700 mb-6 whitespace-pre-line">{content}</p>

        <div className="flex items-center justify-between text-gray-400 text-xs mt-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <LikeButton isLiked={isLiked} likes={likes} onClick={toggleLike} />
            </div>
            {type !== 'notice' && (
              <div className="flex items-center gap-1">
                <CommentButton size={14} onClick={() => {}} />
                <span className="text-primary-500">{comments}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 text-gray-400 text-xs cursor-default select-none">
            <IconWrapper icon={Eye} size={14} className="pointer-events-none" />
            <span className="text-primary-500">{views}</span>
          </div>
        </div>

        {type !== 'notice' && (
          <div className="pt-4">
            <CommentList communityUuid={id} />
          </div>
        )}

        <div className="fixed bottom-8 right-8 z-50">
          <CommunityNewPostButton to={`/community/${type}/write`} postType={type!} />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
