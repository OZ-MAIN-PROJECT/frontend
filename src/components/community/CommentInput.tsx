import { useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComment } from '@/apis/communityApi';

interface CommentInputProps {
  communityUuid: string;
  parentCommentId?: number | null;
  type?: 'comment' | 'reply';
  initialValue?: string;
  buttonLabel?: string;
  isEditMode?: boolean;
}

const CommentInput = ({
  communityUuid,
  parentCommentId = null,
  type = 'comment',
  initialValue = '',
  buttonLabel = '등록',
  isEditMode = false,
}: CommentInputProps) => {
  const [value, setValue] = useState(initialValue);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const { mutate } = useMutation({
    mutationFn: () =>
      createComment({
        communityUuid,
        content: value,
        parentCommentId,
      }),
    onSuccess: () => {
      setValue('');
      queryClient.invalidateQueries({ queryKey: ['comments', communityUuid] });
    },
  });

  const handleSubmit = () => {
    if (!value.trim()) return;
    mutate();
  };

  return (
    <div className="w-full">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={type === 'reply' ? '답글을 입력하세요' : '댓글을 입력하세요'}
        className={`w-full text-sm px-4 py-2 resize-none overflow-hidden
          ${isEditMode ? 'border border-gray-300 focus:border-gray-300 focus:ring-0 rounded-none' : 'border-none focus:ring-1 focus:ring-primary-400'}
        `}
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
