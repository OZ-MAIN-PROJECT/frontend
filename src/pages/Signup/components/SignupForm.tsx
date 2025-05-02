import Input from '@/components/common/Input';
import { useState } from 'react';
import InputWithCheckButton from './InputWithCheckbox';
import { isValidEmail } from '@/utils/validators';
import DropdownInput from './DropdownInput';

const SignupForm = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [answer, setAnswer] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  const items = ['질문 1', '질문 2', '질문 3'];

  const validateEmail = (value: string) => {
    if (!isValidEmail(value)) return '올바른 이메일 형식이 아닙니다.';
    return null;
  };

  const checkEmailAvailability = async (email: string) => {
    // 실제 API 통신 로직으로 개발 필요
    if (email === 'test@mail.com') return '이미 사용 중인 이메일입니다.';
    return null;
  };

  return (
    <form className="w-[500px]">
      <Input
        className="h-[60px] w-full"
        placeholder="이름"
        value={userName}
        onChange={e => setUserName(e.target.value)}
      />
      <InputWithCheckButton
        placeholder="이메일"
        type="email"
        value={userEmail}
        onChange={setUserEmail}
        validate={validateEmail}
        checkAvailability={checkEmailAvailability}
      />
      <div className="mt-10">
        <p className="font-semibold text-primary-900 mb-4">본인확인용 질문</p>
        <DropdownInput items={items} selected={selectedValue} onSelect={setSelectedValue} />
        <Input
          className="h-[60px] w-full"
          placeholder="답변을 작성하세요."
          value={answer}
          onChange={e => setAnswer(e.target.value)}
        />
      </div>
    </form>
  );
};

export default SignupForm;
