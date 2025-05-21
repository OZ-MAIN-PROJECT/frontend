import { useState } from 'react';
import Button from '@/components/common/Button';

interface InputWithCheckButtonProps {
  placeholder: string;
  type?: string;
  value: string;
  filed : 'email' | 'nickname';
  onChange: (value: string) => void;
  validate?: (value: string) => string | null;
  checkAvailability: (value: string) => Promise<string | null>;
  successMessage?: string;
  duplicateMessage?: string;
}

const InputWithCheckButton = ({
  placeholder,
  type = 'text',
  value,
  onChange,
  validate,
  checkAvailability,
  successMessage = '사용 가능합니다.',
  duplicateMessage = '이미 사용 중입니다.',
}: InputWithCheckButtonProps) => {
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState<'error' | 'success' | ''>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setStatusMessage('');
    setStatusType('');

    if (validate) {
      const error = validate(newValue);
      if (error) {
        setStatusMessage(error);
        setStatusType('error');
      }
    }
  };

  const handleCheck = async () => {
    if (statusType === 'error' || !value) return;

    const result = await checkAvailability(value);

    if (result) {
      setStatusMessage(duplicateMessage);
      setStatusType('error');
    } else {
      setStatusMessage(successMessage);
      setStatusType('success');
    }
  };

  return (
    <div className="w-full mb-4">
      <div className="flex p-1 border h-[60px] items-center border-gray-300 bg-white dark:bg-white/10 dark:border-none rounded-md overflow-hidden">
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          className="flex-1 px-4 py-3 text-sm text-gray-900 placeholder-gray-500 focus:outline-none dark:text-white dark:bg-white/0"
        />
        <Button
          className="mr-1 font-normal"
          width="w-[80px]"
          height="h-[35px]"
          fontSize="small"
          color="primary"
          onClick={handleCheck}
        >
          중복 확인
        </Button>
      </div>

      {statusMessage && (
        <p className={`text-sm mt-1 ${statusType === 'error' ? 'text-accent-red' : 'text-accent-blue'}`}>
          {statusMessage}
        </p>
      )}
    </div>
  );
};

export default InputWithCheckButton;
