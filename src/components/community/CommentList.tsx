import { useState } from 'react';
import AuthorInfo from './AuthorInfo';
import CommentMoreButton from './CommentMoreButton';
import CommentInput from './CommentInput';

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    nickname: string;
    profileImageUrl?: string;
  };
  isMine?: boolean;
}

const CommentList = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  const handleAddComment = (newContent: string) => {
    const newComment: Comment = {
      id: (comments.length + 1).toString(),
      content: newContent,
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      isMine: true,
      author: {
        id: 'currentUser',
        nickname: '나',
        profileImageUrl: '',
      },
    };
    setComments(prev => [newComment, ...prev]);
  };

  const handleEditComment = (updatedContent: string) => {
    if (!editingCommentId) return;
    setComments(prev =>
      prev.map(comment =>
        comment.id === editingCommentId ? { ...comment, content: updatedContent } : comment,
      ),
    );
    setEditingCommentId(null);
  };

  const handleDeleteComment = (commentId: string) => {
    const confirmed = window.confirm('정말로 이 댓글을 삭제하시겠습니까?');
    if (!confirmed) return;
    setComments(prev => prev.filter(comment => comment.id !== commentId));
  };

  return (
    <div>
      {/* 댓글 입력창 */}
      <CommentInput onSubmit={handleAddComment} buttonLabel="등록" />

      {/* 댓글이 있을 때만 리스트 출력 */}
      {comments.length > 0 && comments.map(comment => (
        <div key={comment.id} className="relative group mt-2 mb-4">
          <div className="flex items-start justify-between gap-2 border-t pt-3">
            <div className="flex items-center gap-2">
              <AuthorInfo author={comment.author} size={24} fontSize="text-xs" textColor="text-gray-800" />
              <span className="text-[11px] text-gray-400">{comment.createdAt}</span>
            </div>

            <div className="relative ml-auto mt-1 w-[24px] h-[24px] flex items-center justify-center">
              {comment.isMine && (
                <CommentMoreButton
                  onEdit={() => setEditingCommentId(comment.id)}
                  onDelete={() => handleDeleteComment(comment.id)}
                />
              )}
            </div>
          </div>

          {/* 댓글 내용 or 수정 input */}
          {editingCommentId === comment.id ? (
            <div className="mt-2">
              <CommentInput
                onSubmit={handleEditComment}
                initialValue={comment.content}
                buttonLabel="수정"
                isEditMode
              />
            </div>
          ) : (
            <p className="text-sm text-gray-700 mt-1 ml-[14px] whitespace-pre-line">
              {comment.content}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
