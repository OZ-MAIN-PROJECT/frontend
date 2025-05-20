import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Button from '@/components/common/Button';
import CommunityTitle from '@/components/community/CommunityTitle';
import { Triangle } from 'lucide-react';
import { useAuthStore } from '@/stores/useAuthStore';
import { createCommunityPost, updateCommunityPost } from '@/apis/communityApi';
import { ServerPostType, PostType } from '@/types/Post';

const VALID_TYPES: PostType[] = ['emotion', 'notice', 'question'];

const PostWrite = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { type } = useParams<{ type: PostType }>();

  const isInvalidType = !type || !VALID_TYPES.includes(type);

  const existingPost = location.state?.post;
  const { user } = useAuthStore();
  const isEdit = !!existingPost;
  const isAdmin = user?.role === 'admin';

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<PostType>(type || 'question');

  const categoryOptions = [
    { value: 'question', label: '질문 게시판' },
    { value: 'emotion', label: '감정 소비 이야기' },
    ...(isAdmin ? [{ value: 'notice', label: '공지사항' }] : []),
  ];

  useEffect(() => {
    if (isEdit && existingPost) {
      setTitle(existingPost.title);
      setContent(existingPost.content);
      setSelectedCategory(existingPost.type);
    }
  }, [isEdit, existingPost]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  };

  const handleSubmit = async () => {
    const confirmed = window.confirm(isEdit ? '게시글을 수정하시겠습니까?' : '게시글을 등록하시겠습니까?');
    if (!confirmed) return;

    try {
      if (isEdit && existingPost) {
        await updateCommunityPost(existingPost.id, {
          title,
          content,
          type: selectedCategory.toUpperCase() as ServerPostType,
          image: image ?? undefined,
        });

        navigate(`/community/${selectedCategory}/${existingPost.id}`);
      } else {
        const { id } = await createCommunityPost({
          title,
          content,
          type: selectedCategory.toUpperCase() as ServerPostType,
          image: image ?? undefined,
        });

        if (!id) throw new Error('응답에서 게시글 ID를 가져올 수 없습니다.');

        navigate(`/community/${selectedCategory}/${id}`);
      }
    } catch (err) {
      console.error('게시글 등록 실패:', err);
      alert('게시글 처리 중 오류가 발생했습니다.');
    }
  };

  if (isInvalidType) {
    return <p className="text-center pt-10 text-red-500">잘못된 게시판 접근입니다.</p>;
  }

  return (
    <div className="flex-1 p-5 lg:p-10">
      <div className="relative w-full max-w-[800px] mx-auto px-4 sm:px-6">
        <CommunityTitle title={isEdit ? '게시글 수정' : '게시글 작성'} />

        <div className="border bg-white rounded-lg p-6 shadow-sm">
          <div className="mb-4">
            <div className="relative inline-block w-full">
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value as PostType)}
                disabled={isEdit}
                className={`appearance-none w-full text-lg font-semibold text-primary-800 border-b-2 border-primary-800 bg-transparent focus:outline-none pl-2 pr-8 py-2 ${isEdit ? 'cursor-not-allowed opacity-70' : ''}`}
              >
                {categoryOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <Triangle
                size={14}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary-800 pointer-events-none rotate-180 fill-current"
              />
            </div>
          </div>

          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="제목을 입력해주세요."
            className="w-full text-xl font-medium placeholder:text-gray-400 mb-4 focus:outline-none border-b pb-2"
          />

          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="콘텐츠 내용을 입력하세요."
            className="w-full min-h-[200px] placeholder:text-gray-400 text-sm focus:outline-none border-b pb-4 resize-none"
          />

          <div className="flex items-center justify-between mt-4 text-sm text-gray-400 pb-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <span>사진 {image ? '1/1' : '0/1'}</span>
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>
        </div>

        <div className="mt-6">
          <Button width="w-full" onClick={handleSubmit}>
            {isEdit ? '수정' : '등록'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostWrite;
