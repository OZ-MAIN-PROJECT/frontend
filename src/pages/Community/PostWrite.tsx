import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@/components/common/Button';
import CommunityTitle from '@/components/community/CommunityTitle';
import { Triangle } from 'lucide-react';
import { Post } from '@/types/Post';

const PostWrite = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const existingPost = location.state?.post as Post | undefined;
  const initialType = location.state?.type as 'emotion' | 'question' | 'notice' | undefined; // 글쓰기 버튼에서 넘겨준 type

  const isEdit = !!existingPost;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);

  // 운영자 여부 (임시)
  const isAdmin = false;

  const [selectedCategory, setSelectedCategory] = useState<'emotion' | 'question' | 'notice'>(
    initialType ?? existingPost?.type ?? 'question'
  );

  const categoryOptions = [
    { value: 'question', label: '질문 게시판' },
    { value: 'emotion', label: '감정 소비 이야기' },
    ...(isAdmin ? [{ value: 'notice', label: '공지사항' }] : []),
  ];

  useEffect(() => {
    if (isEdit && existingPost) {
      setTitle(existingPost.title);
      setContent(existingPost.content);
      setSelectedCategory(existingPost.type as 'emotion' | 'question' | 'notice');
    }
  }, [isEdit, existingPost]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  };

  const handleSubmit = () => {
    const confirmed = window.confirm(`게시글을 ${isEdit ? '수정' : '등록'}하시겠습니까?`);
    if (!confirmed) return;

    if (selectedCategory === 'notice') {
      console.log('공지사항 등록');
    } else {
      console.log('커뮤니티 게시글 등록');
    }

    switch (selectedCategory) {
      case 'question':
        navigate('/community/question');
        break;
      case 'emotion':
        navigate('/community/emotion');
        break;
      case 'notice':
        navigate('/community/notice');
        break;
      default:
        navigate('/community');
    }
  };

  return (
    <div className="flex-1 p-5 lg:p-10">
      <div className="relative w-full max-w-[800px] mx-auto px-4 sm:px-6">
        <CommunityTitle title="게시글 작성" />

        <div className="border bg-white rounded-lg p-6 shadow-sm">
          {/* 카테고리 드롭다운 */}
          <div className="mb-4">
            <div className="relative inline-block w-full">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as 'emotion' | 'question' | 'notice')}
                className="appearance-none w-full text-lg font-semibold text-primary-800 border-b-2 border-primary-800 bg-transparent focus:outline-none pl-2 pr-8 py-2"
              >
                {categoryOptions.map((option) => (
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

          {/* 제목 입력 */}
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="제목을 입력해주세요."
            className="w-full text-xl font-medium placeholder:text-gray-400 mb-4 focus:outline-none border-b pb-2"
          />

          {/* 내용 입력 */}
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="콘텐츠 내용을 입력하세요."
            className="w-full min-h-[200px] placeholder:text-gray-400 text-sm focus:outline-none border-b pb-4 resize-none"
          />

          {/* 이미지 업로드 */}
          <div className="flex items-center justify-between mt-4 text-sm text-gray-400 pb-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <span>사진 {image ? '1/1' : '0/1'}</span>
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>
        </div>

        {/* 등록/수정 버튼 */}
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
