import { useState, useEffect } from 'react';
import { Comment } from '@/types/Post';
import { useState, useEffect } from 'react';
import { Comment } from '@/types/Post';
import AuthorInfo from './AuthorInfo';
import CommentInput from './CommentInput';
import CommentInput from './CommentInput';
import CommentMoreButton from './CommentMoreButton';
import IconWrapper from './IconWrapper';
import { CornerDownRight } from 'lucide-react';
import IconWrapper from './IconWrapper';
import { CornerDownRight } from 'lucide-react';

const CommentList = () => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      content: '오 어디카페예요? 너무 맛있겠네요!',
      createdAt: '2025-05-13 08:24',
      createdAt: '2025-05-13 08:24',
      isMine: true,
      author: {
        id: 'user1',
        nickname: '유저1',
        profileImageUrl: '',
      },
      parentId: null,
      parentId: null,
    },
    {
      id: '2',
      content: '칭찬이 빵보다 달다구리합니다 ☕️',
      createdAt: '2025-05-13 08:25',
      isMine: true,
      createdAt: '2025-05-13 08:25',
      isMine: true,
      author: {
        id: 'user2',
        nickname: '유저2',
        profileImageUrl: '',
      },
      parentId: null,
      parentId: null,
    },
  ]);

  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [replyTargetId, setReplyTargetId] = useState<string | null>(null);

  useEffect(() => {
    console.log('현재 comments 배열 상태:', comments);
  }, [comments]);
  const [replyTargetId, setReplyTargetId] = useState<string | null>(null);

  useEffect(() => {
    console.log('현재 comments 배열 상태:', comments);
  }, [comments]);

  const handleAddComment = (content: string, parentId: string | null = null) => {
  const handleAddComment = (content: string, parentId: string | null = null) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      content,
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
      parentId,
    };
    setComments(prev => [...prev, newComment]);
    setReplyTargetId(null);
    setComments(prev => [...prev, newComment]);
    setReplyTargetId(null);
  };

  const handleEditComment = (updatedContent: string) => {
    if (!editingCommentId) return;
    setComments(prev =>
      prev.map(comment => (comment.id === editingCommentId ? { ...comment, content: updatedContent } : comment)),
    );
    setEditingCommentId(null);
  };

  const handleDeleteComment = (commentId: string) => {
    const confirmed = window.confirm('정말로 이 댓글을 삭제하시겠습니까?');
    if (!confirmed) return;

    if (editingCommentId === commentId) {
      setEditingCommentId(null);
    }

    setComments(prev => {
      const target = prev.find(c => c.id === commentId);
      if (!target) return prev;

      if (target.parentId === null) {
        return prev.map(c =>
          c.id === commentId
            ? { ...c, content: '작성자가 삭제한 댓글입니다.', isMine: false } // 🔥 여기 isMine: false 추가
            : c,
        );
      } else {
        return prev
          .map(c => (c.parentId === commentId ? { ...c, parentId: target.parentId } : c))
          .filter(c => c.id !== commentId);
      }
    });
  };

  useEffect(() => {
    const deletedRootIds = comments
      .filter(c => c.parentId === null && c.content === '작성자가 삭제한 댓글입니다.')
      .map(c => c.id);

    deletedRootIds.forEach(rootId => {
      const hasChildren = comments.some(c => c.parentId === rootId);
      if (!hasChildren) {
        setComments(prev => prev.filter(c => c.id !== rootId));
      }
    });
  }, [comments]);

  const renderRootComments = () => {
    const rootComments = comments.filter(c => c.parentId === null);

    return rootComments.map(root => {
      const childComments = comments.filter(c => c.parentId === root.id);
      const isDeletedRoot = root.content === '작성자가 삭제한 댓글입니다.';

      return (
        <div key={root.id} className="py-4 border-t first:border-t-0">
          {/* 루트 댓글 */}
          <div
            onClick={() => {
              if (editingCommentId || isDeletedRoot) return;
              setReplyTargetId(root.id);
            }}
            className={`flex flex-col ${isDeletedRoot ? 'cursor-default' : 'cursor-pointer'}`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <AuthorInfo author={root.author} size={24} fontSize="text-xs" textColor="text-gray-800" />
                <span className="text-[10px] text-gray-400">{root.createdAt}</span>
              </div>
              {root.isMine && editingCommentId !== root.id && (
                <div
                  className="relative ml-auto w-[24px] h-[24px] flex items-center justify-center"
                  onClick={e => e.stopPropagation()}
                >
                  <CommentMoreButton
                    onEdit={() => setEditingCommentId(root.id)}
                    onDelete={() => handleDeleteComment(root.id)}
                  />
                </div>
              )}
            </div>

            {/* 루트 댓글 내용 */}
            {editingCommentId === root.id ? (
              <div className="mt-2 ml-[34px]">
                <CommentInput onSubmit={handleEditComment} initialValue={root.content} buttonLabel="수정" isEditMode />
              </div>
            ) : (
              <p className="text-sm text-gray-700 mt-1 ml-[34px] whitespace-pre-line">{root.content}</p>
            )}
          </div>

          {/* 대댓글 */}
          {childComments.map(child => (
            <div
              key={child.id}
              onClick={() => {
                if (editingCommentId || isDeletedRoot) return;
                setReplyTargetId(root.id); // 무조건 부모에게 답글 다는 구조
              }}
              className="mt-4 ml-6 flex flex-col cursor-pointer"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <IconWrapper icon={CornerDownRight} size={16} color="#151d4a" className="mt-1" />
                  <AuthorInfo author={child.author} size={20} fontSize="text-xs" textColor="text-gray-800" />
                  <span className="text-[10px] text-gray-400">{child.createdAt}</span>
                </div>
                {child.isMine && editingCommentId !== child.id && (
                  <div
                    className="relative ml-auto w-[24px] h-[24px] flex items-center justify-center"
                    onClick={e => e.stopPropagation()}
                  >
                    <CommentMoreButton
                      onEdit={() => setEditingCommentId(child.id)}
                      onDelete={() => handleDeleteComment(child.id)}
                    />
                  </div>
                )}
              </div>

              {editingCommentId === child.id ? (
                <div className="mt-2 ml-[34px]">
                  <CommentInput
                    onSubmit={handleEditComment}
                    initialValue={child.content}
                    buttonLabel="수정"
                    isEditMode
                  />
                </div>
              ) : (
                <p className="text-sm text-gray-700 mt-1 ml-[34px] whitespace-pre-line">{child.content}</p>
              )}
            </div>
          ))}

          {/* 대댓글 입력창 (루트 댓글일 때만) */}
          {replyTargetId === root.id && !isDeletedRoot && (
            <div className="flex items-start gap-2 ml-6 mt-2">
              <IconWrapper icon={CornerDownRight} size={16} color="#151d4a" className="mt-2" />
              <div className="flex-1">
                <CommentInput
                  onSubmit={replyContent => handleAddComment(replyContent, root.id)}
                  buttonLabel="답글 등록"
                />
              </div>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div>
      <CommentInput onSubmit={content => handleAddComment(content)} buttonLabel="등록" />
      {renderRootComments()}
    </div>
  );
};

export default CommentList;
