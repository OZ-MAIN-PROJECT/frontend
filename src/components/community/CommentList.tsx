import { useState } from 'react';
import { Comment } from '@/types/Post';
import AuthorInfo from './AuthorInfo';
import CommentInput from './CommentInput';
import CommentMoreButton from './CommentMoreButton';
import IconWrapper from './IconWrapper';
import { CornerDownRight } from 'lucide-react';

const CommentList = () => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      content: '오 어디카페예요? 너무 맛있겠네요!',
      createdAt: '2025-05-13 08:24',
      isMine: true,
      author: {
        id: 'user1',
        nickname: '유저1',
        profileImageUrl: '',
      },
      parentId: null,
    },
    {
      id: '2',
      content: '칭찬이 빵보다 달다구리합니다 ☕️',
      createdAt: '2025-05-13 08:25',
      isMine: true,
      author: {
        id: 'user2',
        nickname: '유저2',
        profileImageUrl: '',
      },
      parentId: null,
    },
  ]);

  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [replyTargetId, setReplyTargetId] = useState<string | null>(null);

  const handleAddComment = (content: string, parentId: string | null = null) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      content,
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      isMine: true,
      author: {
        id: 'currentUser',
        nickname: '나',
        profileImageUrl: '',
      },
      parentId,
    };
    setComments(prev => [...prev, newComment]);
    setReplyTargetId(null);
  };

  const handleEditComment = (updatedContent: string) => {
    if (!editingCommentId) return;
    setComments(prev =>
      prev.map(comment =>
        comment.id === editingCommentId ? { ...comment, content: updatedContent } : comment
      )
    );
    setEditingCommentId(null);
  };

  const handleDeleteComment = (commentId: string) => {
    const confirmed = window.confirm('정말로 이 댓글을 삭제하시겠습니까?');
    if (!confirmed) return;
    setComments(prev => prev.filter(comment => comment.id !== commentId));
  };

  const renderComments = (parentId: string | null = null, depth: number = 0) => {
    const filteredComments = comments.filter(comment => comment.parentId === parentId);

    return filteredComments.map((comment, index) => (
      <div
        key={comment.id}
        className={`${depth === 0 && index !== 0 ? 'border-t' : ''} ${depth === 0 ? 'py-4' : 'mt-4 ml-6'}`}
      >
        <div
          onClick={() => {
            if (editingCommentId) return; // 수정 중일 땐 대댓글 입력 막기
            setReplyTargetId(comment.id);
          }}
          className="flex flex-col cursor-pointer"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              {depth > 0 && (
                <IconWrapper
                  icon={CornerDownRight}
                  size={16}
                  color="#151d4a"
                  className="mt-1"
                />
              )}
              <AuthorInfo
                author={comment.author}
                size={depth > 0 ? 20 : 24}
                fontSize="text-xs"
                textColor="text-gray-800"
              />
              <span className="text-[10px] text-gray-400">{comment.createdAt}</span>
            </div>

            {/* 수정 중이 아닐 때만 MoreButton 보여줌 */}
            {editingCommentId !== comment.id && (
              <div
                className="relative ml-auto w-[24px] h-[24px] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                {comment.isMine && (
                  <CommentMoreButton
                    onEdit={() => setEditingCommentId(comment.id)}
                    onDelete={() => handleDeleteComment(comment.id)}
                  />
                )}
              </div>
            )}
          </div>

          {/* 댓글 내용 or 수정 input */}
          {editingCommentId === comment.id ? (
            <div className="mt-2 ml-[34px]">
              <CommentInput
                onSubmit={handleEditComment}
                initialValue={comment.content}
                buttonLabel="수정"
                isEditMode
              />
            </div>
          ) : (
            <p className="text-sm text-gray-700 mt-1 ml-[34px] whitespace-pre-line">
              {comment.content}
            </p>
          )}
        </div>

        {/* 대댓글 입력창 */}
        {replyTargetId === comment.id && (
          <div className="flex items-start gap-2 ml-6 mt-2">
            <IconWrapper
              icon={CornerDownRight}
              size={16}
              color="#151d4a"
              className="mt-2"
            />
            <div className="flex-1">
              <CommentInput
                onSubmit={(replyContent) => handleAddComment(replyContent, comment.id)}
                buttonLabel="답글 등록"
              />
            </div>
          </div>
        )}

        {/* 대댓글 재귀 렌더링 */}
        {renderComments(comment.id, depth + 1)}
      </div>
    ));
  };

  return (
    <div>
      <CommentInput onSubmit={(content) => handleAddComment(content)} buttonLabel="등록" />
      {renderComments()}
    </div>
  );
};

export default CommentList;
