import { useState, useEffect } from 'react';

interface CommentInputProps {
  onSubmit: (value: string) => void;
  initialValue?: string;
  buttonLabel?: string;
  bordered?: boolean;
  withTopBorder?: boolean;
}

const CommentInput = ({
  onSubmit,
  initialValue = '',
  buttonLabel = '등록',
  bordered = true,
  withTopBorder = false,
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

  const isRegistrationInput = withTopBorder && bordered;

  return (
    <div className={`w-full ${withTopBorder ? 'border-t pt-4 mt-6' : ''}`}>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="댓글을 입력하세요."
        className={`w-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary-400
          ${bordered && !isRegistrationInput ? 'border rounded-lg' : ''}
        `}
      />
      <div className="flex justify-end mt-2 mb-5">
        <button onClick={handleSubmit} className="text-sm text-accent-blue font-medium hover:underline">
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default CommentInput;
