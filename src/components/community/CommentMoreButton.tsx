import { useAuthStore } from '@/stores/useAuthStore';
import { Comment } from '@/types/Post';
import { deleteComment, updateComment } from '@/apis/communityApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const CommentMoreButton = ({ communityUuid, comment }: { communityUuid: string; comment: Comment }) => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  if (!comment || !comment.author) return null;

  const isOwner = user?.nickname === comment.author.nickname;

  const updateMutation = useMutation({
    mutationFn: (content: string) => updateComment({ communityUuid, commentId: comment.id, content }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['comments', communityUuid] }),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteComment({ communityUuid, commentId: comment.id }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['comments', communityUuid] }),
  });

  if (!isOwner) return null;

  return (
    <div className="mt-1 flex gap-2 text-xs text-blue-500">
      <button
        onClick={() => {
          const newContent = prompt('수정할 내용을 입력하세요', comment.content);
          if (newContent && newContent !== comment.content) {
            updateMutation.mutate(newContent);
          }
        }}
      >
        수정
      </button>
      <button
        onClick={() => {
          if (confirm('정말 삭제하시겠습니까?')) {
            deleteMutation.mutate();
          }
        }}
      >
        삭제
      </button>
    </div>
  );
};

export default CommentMoreButton;
