import { useState, useEffect, useRef } from 'react';

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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const handleSubmit = () => {
    if (!value.trim()) return;
    onSubmit(value.trim());
    setValue('');
  };

  return (
    <div className="w-full">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="댓글을 입력하세요."
        className={`w-full text-sm px-4 py-2 resize-none overflow-hidden
          ${isEditMode
            ? 'border border-gray-300 focus:border-gray-300 focus:ring-0 rounded-none' 
            : 'border-none focus:ring-1 focus:ring-primary-400'
          }
        `}
        rows={1}
      />
      <div className="flex justify-end my-2">
        <button
          onClick={handleSubmit}
          disabled={!value.trim()}
          className={`text-sm font-medium ${
            !value.trim()
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-accent-blue hover:underline'
          }`}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default CommentInput;