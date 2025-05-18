import { useQuery } from '@tanstack/react-query';
import { getComments } from '@/apis/communityApi';
import { Comment } from '@/types/Post';
import CommentInput from './CommentInput';
import CommentMoreButton from './CommentMoreButton';

const CommentList = ({ communityUuid }: { communityUuid: string }) => {
  const { data: comments, isLoading } = useQuery<Comment[]>({
    queryKey: ['comments', communityUuid],
    queryFn: () => getComments(communityUuid),
  });

  return (
    <div className="mt-4">
      <CommentInput communityUuid={communityUuid} parentCommentId={null} type="comment" />
      {isLoading && <p className="text-sm text-gray-400 mt-2">댓글 불러오는 중...</p>}

      {!isLoading && (!comments || comments.length === 0) && (
        <p className="text-sm text-gray-400 mt-2">댓글이 없습니다.</p>
      )}

      {comments && comments.length > 0 && (
        <div className="mt-4 space-y-4">
          {comments.map(comment => (
            <div key={comment.id} className="border rounded p-3 bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold">{comment.author.nickname}</p>
                  <p className="text-sm text-gray-700 mt-1 whitespace-pre-line">{comment.content}</p>
                </div>
                <CommentMoreButton communityUuid={communityUuid} comment={comment} />
              </div>

              {Array.isArray(comment.children) && comment.children.length > 0 && (
                <div className="ml-4 mt-3 space-y-2 border-l border-gray-300 pl-4">
                  {comment.children.map(reply => (
                    <div key={reply.id}>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium">{reply.author.nickname}</p>
                          <p className="text-sm text-gray-700 whitespace-pre-line">{reply.content}</p>
                        </div>
                        <CommentMoreButton communityUuid={communityUuid} comment={reply} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <CommentInput communityUuid={communityUuid} parentCommentId={comment.id} type="reply" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentList;
