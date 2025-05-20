import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getComments, createComment, deleteComment, updateComment } from '@/apis/communityApi';
import { Comment } from '@/types/Post';
import AuthorInfo from './AuthorInfo';
import CommentInput from './CommentInput';
import CommentMoreButton from './CommentMoreButton';
import IconWrapper from './IconWrapper';
import { CornerDownRight } from 'lucide-react';
import { format } from 'date-fns';
import { useAuthStore } from '@/stores/useAuthStore';

const CommentList = ({ communityUuid }: { communityUuid: string }) => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [replyTargetId, setReplyTargetId] = useState<number | null>(null);

  const { data: comments = [], isLoading } = useQuery<Comment[]>({
    queryKey: ['comments', communityUuid],
    queryFn: () => getComments(communityUuid),
  });
  console.log(comments);

  const createMutation = useMutation({
    mutationFn: ({ content, parentCommentId }: { content: string; parentCommentId?: number | null }) =>
      createComment({ communityUuid, content, parentCommentId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', communityUuid] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ commentId, content }: { commentId: number; content: string }) =>
      updateComment({ communityUuid, commentId, content }),
    onSuccess: () => {
      setEditingCommentId(null);
      queryClient.invalidateQueries({ queryKey: ['comments', communityUuid] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (commentId: number) => deleteComment({ communityUuid, commentId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', communityUuid] });
    },
  });

  const renderComments = () => {
    // const rootComments = comments.filter(c => c.parentCommentId === null);
    // const childMap: { [parentCommentId: number]: Comment[] } = {};
    // comments.forEach(comment => {
    //   if (comment.parentCommentId !== null) {
    //     if (!childMap[comment.parentCommentId]) childMap[comment.parentCommentId] = [];
    //     childMap[comment.parentCommentId].push(comment);
    //   }
    // });

    return comments.map(root => {
      // const childComments = childMap[root.id] || [];
      // console.log(root);
      const isDeletedRoot = root.content === '작성자가 삭제한 댓글입니다.';
      const isOwner = user?.nickname === root.author.nickname;

      return (
        <div key={root.id} className="py-4 border-t first:border-t-0">
          <div
            className={`flex flex-col ${isDeletedRoot ? 'cursor-default' : 'cursor-pointer'}`}
            onClick={() => {
              if (editingCommentId || isDeletedRoot) return;
              setReplyTargetId(root.id);
            }}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <AuthorInfo author={root.author} size={24} fontSize="text-xs" textColor="text-gray-800" />
                <span className="text-[10px] text-gray-400">
                  {format(new Date(root.createdAt), 'yyyy.MM.dd HH:mm')}
                </span>
              </div>
              {isOwner && editingCommentId !== root.id && (
                <div
                  className="relative ml-auto w-[24px] h-[24px] flex items-center justify-center group"
                  onClick={e => e.stopPropagation()}
                >
                  <CommentMoreButton
                    onEdit={() => setEditingCommentId(root.id)}
                    onDelete={() => deleteMutation.mutate(root.id)}
                  />{' '}
                </div>
              )}
            </div>

            {editingCommentId === root.id ? (
              <div className="mt-2 ml-[34px]">
                <CommentInput
                  // communityUuid={communityUuid}
                  initialValue={root.content}
                  buttonLabel="수정"
                  isEditMode
                  onComplete={value => updateMutation.mutate({ commentId: root.id, content: value })}
                />
              </div>
            ) : (
              <p className="text-sm text-gray-700 mt-1 ml-[34px] whitespace-pre-line">{root.content}</p>
            )}
          </div>

          {root.children?.map(child => {
            const isOwner = user?.nickname === child.author.nickname;

            return (
              <div key={child.id} className="mt-4 ml-6">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <IconWrapper icon={CornerDownRight} size={16} color="#151d4a" className="mt-1" />
                    <AuthorInfo author={child.author} size={20} fontSize="text-xs" textColor="text-gray-800" />
                    <span className="text-[10px] text-gray-400">
                      {format(new Date(child.createdAt), 'yyyy.MM.dd HH:mm')}
                    </span>
                  </div>
                  {isOwner && editingCommentId !== child.id && (
                    <CommentMoreButton
                      onEdit={() => setEditingCommentId(child.id)}
                      onDelete={() => deleteMutation.mutate(child.id)}
                    />
                  )}
                </div>

                {editingCommentId === child.id ? (
                  <div className="mt-2 ml-[34px]">
                    <CommentInput
                      // communityUuid={communityUuid}
                      initialValue={child.content}
                      buttonLabel="수정"
                      isEditMode
                      onComplete={value => updateMutation.mutate({ commentId: child.id, content: value })}
                    />
                  </div>
                ) : (
                  <p className="text-sm text-gray-700 mt-1 ml-[34px] whitespace-pre-line">{child.content}</p>
                )}
              </div>
            );
          })}

          {replyTargetId === root.id && !isDeletedRoot && (
            <div className="flex items-start gap-2 ml-6 mt-2">
              <IconWrapper icon={CornerDownRight} size={16} color="#151d4a" className="mt-2" />
              <div className="flex-1">
                <CommentInput
                  // communityUuid={communityUuid}
                  type="reply"
                  buttonLabel="등록"
                  onComplete={() => setReplyTargetId(null)}
                />
              </div>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="mt-4">
      <CommentInput
        // communityUuid={communityUuid}
        // parentCommentId={null}
        type="comment"
        onComplete={value => createMutation.mutate({ content: value, parentCommentId: null })}
      />
      {isLoading ? (
        <p className="text-sm text-gray-400 mt-2">댓글 불러오는 중...</p>
      ) : comments.length === 0 ? (
        <p className="text-sm text-gray-400 mt-2">댓글이 없습니다.</p>
      ) : (
        renderComments()
      )}
    </div>
  );
};

export default CommentList;
