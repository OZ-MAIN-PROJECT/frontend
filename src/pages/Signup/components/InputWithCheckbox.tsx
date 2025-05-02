import { useState } from 'react';
import Button from '@/components/common/Button';

interface InputWithCheckButtonProps {
  placeholder: string;
  type?: string;
  value : string;
  onChange: (value: string) => void;
  validate?: (value: string) => string | null; // 유효성 검사
  checkAvailability: (value: string) => Promise<string | null>; // 중복 확인
}

const InputWithCheckButton = ({
    placeholder,
    type = 'text',
    value,
    onChange,
    validate,
    checkAvailability,
  }: InputWithCheckButtonProps) => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      onChange(newValue); // 외부 상태 업데이트
      setSuccess('');
  
      if (validate) {
        const errorMsg = validate(newValue);
        setError(errorMsg ?? '');
      } else {
        setError('');
      }
    };
  
    const handleCheck = async () => {
      if (error || !value) return;
  
      const result = await checkAvailability(value);
  
      if (result) {
        setError(result);
        setSuccess('');
      } else {
        setError('');
        setSuccess('사용 가능합니다.');
      }
    };
  
    return (
      <div className="w-full mb-4">
        <div className="flex p-1 border h-[60px] items-center border-gray-300 bg-white rounded-md overflow-hidden">
          <input
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
            className="flex-1 px-4 py-3 text-sm text-gray-900 placeholder-gray-500 focus:outline-none"
          />
          <Button
            width="w-[110px]"
            height="h-[48px]"
            fontSize="small"
            color="primary"
            onClick={handleCheck}
          >
            중복 확인
          </Button>
        </div>
  
        {error && <p className="text-sm text-accent-red mt-1">{error}</p>}
        {success && <p className="text-sm text-accent-blue mt-1">{success}</p>}
      </div>
    );
  };
  

export default InputWithCheckButton;
