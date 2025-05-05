import { useParams } from 'react-router-dom';
import { dummyPosts } from '../../constants/dummyPosts';
import { format } from 'date-fns';
import { Eye, EllipsisVertical } from 'lucide-react';
import AuthorInfo from './AuthorInfo';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';
import IconWrapper from './IconWrapper';
import CommentList from './CommentList';

const PostDetail = () => {
  const { id } = useParams();
  const post = dummyPosts.find(p => p.id === id);

  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  const { title, imageUrl, content, createdAt, likes, comments, views, author } = post;
  const formattedDate = format(new Date(createdAt), 'yyyy.MM.dd HH:mm');

  return (
    <div className="w-full max-w-[800px] mx-auto px-4 sm:px-6 py-8">
      <div className="border bg-white rounded-lg shadow-sm">
        <div className="p-[30px]">
          {/* 작성자/작성일/더보기 */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <AuthorInfo author={author} />
              <span className="text-xs text-primary-500 ml-2">{formattedDate}</span>
            </div>
            <div className="relative">
              <IconWrapper icon={EllipsisVertical} size={20} color="#9ca3af" ariaLabel="더보기 메뉴 열기" />
            </div>
          </div>

          {/* 제목 */}
          <h2 className="text-xl font-semibold text-gray-800 mb-3">{title}</h2>

          {/* 이미지 */}
          {imageUrl && (
            <div className="relative flex items-center justify-center w-full bg-gray-200 rounded mb-6 h-auto sm:h-[400px]">
              <img src={imageUrl} alt="게시물 이미지" className="w-full sm:w-auto h-auto sm:h-full object-cover" />
            </div>
          )}

          {/* 내용 */}
          <p className="text-gray-700 mb-6 whitespace-pre-line">{content}</p>

          {/* 좋아요/댓글/조회수 */}
          <div className="flex items-center justify-between text-gray-400 text-xs mt-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <LikeButton size={14} onToggle={() => console.log('좋아요')} />
                <span className="text-primary-500">{likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <CommentButton size={14} onClick={() => console.log('댓글')} />
                <span className="text-primary-500">{comments}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-gray-400 text-xs cursor-default select-none">
              <IconWrapper icon={Eye} size={14} className="pointer-events-none" />
              <span className="text-primary-500">{views}</span>
            </div>
          </div>

          {/* 댓글 영역 */}
          <div className="pt-4">
            <CommentList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
