import { useState } from 'react';
import Button from '@/components/common/Button';
import CommunityTitle from '@/components/community/CommunityTitle';
import { Image } from 'lucide-react';

const PostWrite = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  };

  const handleSubmit = () => {
    const confirmed = window.confirm('게시글을 등록하시겠습니까?');
    if (!confirmed) return;
    // 등록 로직 추가 예정
  };

  return (
    <div className="w-full max-w-[800px] mx-auto px-4 sm:px-6 py-8">
      <CommunityTitle title="감정 소비 이야기" />

      <div className="border bg-white rounded-lg p-6 shadow-sm">
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
            <Image size={16} />
            <span>사진 {image ? '1/1' : '0/1'}</span>
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
        </div>
      </div>

      <div className="mt-6">
        <Button width="w-full" onClick={handleSubmit}>
          등록
        </Button>
      </div>
    </div>
  );
};

export default PostWrite;
