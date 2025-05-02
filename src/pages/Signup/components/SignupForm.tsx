import { useState } from 'react';
import Input from '@/components/common/Input';
import InputWithCheckButton from './InputWithCheckbox';
import DropdownInput from './DropdownInput';
import Button from '@/components/common/Button';
import { isValidEmail } from '@/utils/validators';
import { SECURITY_QUESTIONS } from '@/constants/questions';
import AlertModal from '@/components/common/Modal/AlertModal';

const SignupForm = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    nickname: '',
    email: '',
    password: '',
    passwordConfirm: '',
    question: '',
    answer: '',
  });

  const [error, setError] = useState('');
  const [errors, setErrors] = useState({ password: '' });
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isNicknameChecked, SetIsNicknameChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (field: keyof typeof userInfo) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo(prev => ({ ...prev, [field]: e.target.value }));

    if (field === 'passwordConfirm' || field === 'password') {
      const pw = field === 'password' ? e.target.value : userInfo.password;
      const confirm = field === 'passwordConfirm' ? e.target.value : userInfo.passwordConfirm;
      setErrors(prev => ({
        ...prev,
        password: pw && confirm && pw !== confirm ? '비밀번호가 일치하지 않습니다.' : '',
      }));
    }
  };

  const validateEmail = (value: string) => {
    return isValidEmail(value) ? null : '올바른 이메일 형식이 아닙니다.';
  };

  const checkEmailAvailability = async (email: string) => {
    if (email === 'test@mail.com') return '이미 사용 중인 이메일입니다.';
    setIsEmailChecked(true);
    return null;
  };

  const checkNicknameAvailability = async (nickname: string) => {
    if (nickname === 'test') return '이미 사용 중인 닉네임입니다.';
    SetIsNicknameChecked(true);
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isEmpty = Object.values(userInfo).some(v => !v.trim());
    if (isEmpty) return setError('모든 필드를 입력해주세요.');

    const emailError = validateEmail(userInfo.email);
    if (emailError) return setError(emailError);

    if (!isEmailChecked) return setError('이메일 중복 확인을 완료해주세요.');
    if (!isNicknameChecked) return setError('닉네임 중복 확인을 완료해주세요.');

    if (userInfo.password !== userInfo.passwordConfirm) {
      return setError('비밀번호가 일치하지 않습니다.');
    }

    console.log('회원가입 시도:', userInfo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <form className="w-[500px] mb-20" onSubmit={handleSubmit}>
        <Input placeholder="이름" value={userInfo.name} onChange={handleChange('name')} className="h-[60px] w-full" />

        <InputWithCheckButton
          placeholder="닉네임"
          value={userInfo.nickname}
          onChange={value => setUserInfo(prev => ({ ...prev, nickname: value }))}
          checkAvailability={checkNicknameAvailability}
          successMessage="사용 가능한 닉네임입니다."
          duplicateMessage="이미 사용중인 닉네임입니다."
        />

        <InputWithCheckButton
          placeholder="이메일"
          type="email"
          value={userInfo.email}
          onChange={value => setUserInfo(prev => ({ ...prev, email: value }))}
          validate={validateEmail}
          checkAvailability={checkEmailAvailability}
          successMessage="사용 가능한 이메일입니다."
          duplicateMessage="이미 사용중인 이메일입니다."
        />

        <Input
          placeholder="비밀번호"
          type="password"
          value={userInfo.password}
          onChange={handleChange('password')}
          className="h-[60px] w-full"
        />

        <Input
          placeholder="비밀번호 확인"
          type="password"
          value={userInfo.passwordConfirm}
          onChange={handleChange('passwordConfirm')}
          className="h-[60px] w-full"
        />

        {errors.password && <p className="text-sm text-accent-red mt-1">{errors.password}</p>}

        <div className="mt-6">
          <p className="font-semibold text-primary-900 mb-2">본인확인용 질문</p>
          <DropdownInput
            items={SECURITY_QUESTIONS}
            selected={userInfo.question}
            onSelect={value => setUserInfo(prev => ({ ...prev, question: value }))}
          />
          <Input
            placeholder="답변을 작성하세요."
            value={userInfo.answer}
            onChange={handleChange('answer')}
            className="h-[60px] w-full"
          />
        </div>

        {error && <p>{error}</p>}
        <Button width="w-full" height="h-[50px]" color="blue" type="submit">
          회원가입
        </Button>
      </form>
      <AlertModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleCloseModal}
        status="success"
        title="회원가입이 완료되었습니다!"
        description="이제 로그인하여 서비스를 이용해보세요."
      />
    </>
  );
};

export default SignupForm;
