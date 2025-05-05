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
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      content: '오 어디카페예요? 너무 맛있겠네요!',
      createdAt: '2025.04.23 10:00',
      isMine: true,
      author: {
        id: 'user1',
        nickname: '유저1',
        profileImageUrl: '',
      },
    },
    {
      id: '2',
      content: '칭찬이 빵보다 달다구리합니다 ☕️',
      createdAt: '2025.04.23 10:03',
      isMine: false,
      author: {
        id: 'user2',
        nickname: '유저2',
        profileImageUrl: '',
      },
    },
  ]);

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
      prev.map(comment => (comment.id === editingCommentId ? { ...comment, content: updatedContent } : comment)),
    );
    setEditingCommentId(null);
  };

  return (
    <div>
      {/* 댓글 입력창 */}
      <CommentInput onSubmit={handleAddComment} buttonLabel="등록" bordered withTopBorder />

      {/* 댓글 리스트 */}
      {comments.map(comment => (
        <div key={comment.id} className="relative group mt-2 mb-4">
          <div className="flex items-start justify-between gap-2 border-t pt-3">
            <div className="flex items-center gap-2">
              <AuthorInfo author={comment.author} size={24} fontSize="text-xs" />
              <span className="text-[11px] text-primary-500">{comment.createdAt}</span>
            </div>

            {comment.isMine && (
              <div className="relative ml-auto mt-1">
                <CommentMoreButton onEdit={() => setEditingCommentId(comment.id)} />
              </div>
            )}
          </div>

          {editingCommentId === comment.id ? (
            <div className="mt-2">
              <CommentInput onSubmit={handleEditComment} initialValue={comment.content} buttonLabel="수정" bordered />
            </div>
          ) : (
            <p className="text-sm text-gray-700 mt-1 ml-[34px]">{comment.content}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
