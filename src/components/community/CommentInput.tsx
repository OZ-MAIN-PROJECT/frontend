import { useState, useEffect } from 'react';

interface CommentInputProps {
  onSubmit: (value: string) => void;
  initialValue?: string;
  buttonLabel?: string;
  isEditMode?: boolean;
}

const CommentInput = ({
  onSubmit,
  initialValue = '',
  buttonLabel = '등록',
  isEditMode = false,
}: CommentInputProps) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleSubmit = () => {
    if (!value.trim()) return;
    onSubmit(value.trim());
    setValue('');
  };

  return (
    <div className="w-full">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="댓글을 입력하세요."
        rows={1} // 기본 1줄, 자동 늘어날 수 있음 (필요하면 조정)
        className={`w-full text-sm px-4 py-2 resize-none
          ${isEditMode
            ? 'border border-gray-300 focus:border-gray-300 focus:ring-0 rounded-none' 
            : 'border-none focus:ring-1 focus:ring-primary-400'
          }
        `}
      />
      <div className="flex justify-end mt-2 mb-5">
        <button
          onClick={handleSubmit}
          className="text-sm text-accent-blue font-medium hover:underline"
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default CommentInput;