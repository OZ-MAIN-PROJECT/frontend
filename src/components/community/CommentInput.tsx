import { useEffect, useRef, useState } from 'react';

interface CommentInputProps {
  type?: 'comment' | 'reply';
  initialValue?: string;
  buttonLabel?: string;
  isEditMode?: boolean;
  onComplete?: (value: string) => void;
}

const CommentInput = ({
  type = 'comment',
  initialValue = '',
  buttonLabel = '등록',
  isEditMode = false,
  onComplete,
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
    onComplete?.(value);
    setValue('');
  };

  return (
    <div className="w-full">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={type === 'reply' ? '답글을 입력하세요' : '댓글을 입력하세요'}
        className={`w-full text-sm px-4 py-2 resize-none overflow-hidden ${
          isEditMode || type === 'reply'
            ? 'border border-gray-300 focus:border-gray-300 focus:ring-0 rounded-md'
            : 'border-none focus:ring-1 focus:ring-primary-400'
        }`}
        rows={1}
      />
      <div className="flex justify-end my-2">
        <button
          onClick={handleSubmit}
          disabled={!value.trim()}
          className={`text-sm font-medium ${
            !value.trim() ? 'text-gray-300 cursor-not-allowed' : 'text-accent-blue hover:underline'
          }`}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default CommentInput;
