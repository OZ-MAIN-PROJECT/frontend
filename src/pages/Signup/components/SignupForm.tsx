import { useEffect, useState } from 'react';
import Input from '@/components/common/Input';
import InputWithCheckButton from '@/components/common/InputWithCheckbox';
import Button from '@/components/common/Button';
import { isValidEmail } from '@/utils/validators';
import { SECURITY_QUESTIONS } from '@/constants/questions';
import AlertModal from '@/components/common/Modal/AlertModal';
import SecurityQuestion from './SecurityQuestion';
import PasswordConfirm from './PasswordConfirm';
import { usePasswordValidation } from '@/hooks/auth/usePasswordValidation';
import { useSignup } from '@/hooks/auth/useSignup';
import { useNavigate } from 'react-router-dom';
import { useDuplicateCheck } from '@/hooks/auth/useDuplicateCheck';

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
  const navigate = useNavigate();

  // 모든 필드에 관한 에러 상태
  const [formError, setFormError] = useState('');

  // 중복 검사 상태 (이메일, 닉네임)
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isNicknameChecked, SetIsNicknameChecked] = useState(false);

  const emailCheck = useDuplicateCheck();
  const nicknameCheck = useDuplicateCheck();

  const checkEmail = async (value: string) => {
    const result = await emailCheck.check('email', value);
    setIsEmailChecked(!result);
    return result;
  };
  const checkNickname = async (value: string) => {
    const result = await nicknameCheck.check('nickname', value);
    SetIsNicknameChecked(!result);
    return result;
  };

  // 이메일 유효성 검사
  const handleEmailChange = (value: string) => {
    return isValidEmail(value) ? null : '올바른 이메일 형식이 아닙니다.';
  };

  // 회원가입 완료 안내 모달
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { signup, loading, error: signupError, success } = useSignup();

  // 입력값 userInfo와 매칭
  const handleChange = (field: keyof typeof userInfo) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo(prev => ({ ...prev, [field]: e.target.value }));
  };

  // 비밀번호 유효성 검사 및 비밀번호 일치 확인
  const { passwordError, validatePassword } = usePasswordValidation();

  const handlePasswordChange = (field: string, value: string) => {
    const updated = { ...userInfo, [field]: value };
    setUserInfo(updated);
    validatePassword(updated.password, updated.passwordConfirm);
  };

  // 제출 전 검사
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');

    const isEmpty = Object.values(userInfo).some(v => !v.trim());
    if (isEmpty) return setFormError('모든 필드를 입력해주세요.');

    const emailError = handleEmailChange(userInfo.email);
    if (emailError) return setFormError(emailError);

    if (!isEmailChecked) return setFormError('이메일 중복 확인을 완료해주세요.');
    if (!isNicknameChecked) return setFormError('닉네임 중복 확인을 완료해주세요.');
    if (userInfo.password !== userInfo.passwordConfirm) return setFormError('비밀번호가 일치하지 않습니다.');
    if (passwordError) return setFormError(passwordError);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordConfirm: _omit, ...signupPayload } = userInfo;
    signup(signupPayload);
    console.log('회원가입 시도:', userInfo);
    navigate('/login');
  };

  useEffect(() => {
    if (success) setIsModalOpen(true);
  }, [success]);

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <form className="w-[500px] mb-20" onSubmit={handleSubmit}>
        {/* 이름 */}
        <Input placeholder="이름" value={userInfo.name} onChange={handleChange('name')} className="h-[60px] w-full" />

        {/* 닉네임 (중복확인) */}
        <InputWithCheckButton
          placeholder="닉네임"
          value={userInfo.nickname}
          filed="nickname"
          onChange={value => {
            setUserInfo(prev => ({ ...prev, nickname: value }));
            SetIsNicknameChecked(false);
            nicknameCheck.reset();
          }}
          checkAvailability={checkNickname}
          successMessage="사용 가능한 닉네임입니다."
          duplicateMessage="이미 사용중인 닉네임입니다."
        />

        {/* 이메일 입력 (중복확인) */}
        <InputWithCheckButton
          placeholder="이메일"
          type="email"
          value={userInfo.email}
          filed="email"
          onChange={value => {
            setUserInfo(prev => ({ ...prev, email: value }));
            setIsEmailChecked(false);
            emailCheck.reset();
          }}
          validate={handleEmailChange}
          checkAvailability={checkEmail}
          successMessage="사용 가능한 이메일입니다."
          duplicateMessage="이미 사용중인 이메일입니다."
        />

        {/* 비밀번호 (일치 여부 + 유효성 확인) */}
        <PasswordConfirm
          password={userInfo.password}
          passwordConfirm={userInfo.passwordConfirm}
          onChange={handlePasswordChange}
          error={passwordError}
        />

        {/* 본인확인용 질문 */}
        <SecurityQuestion
          questions={SECURITY_QUESTIONS}
          question={userInfo.question}
          answer={userInfo.answer}
          onChange={(field, value) => setUserInfo(prev => ({ ...prev, [field]: value }))}
        />

        {/* 모든 입력필드 작성 및 유효성 검사 확인 */}
        {formError && <p className="text-sm text-accent-red text-center mt-1 mb-4">{formError}</p>}
        {signupError && <p className="text-sm text-accent-red text-center mt-1 mb-4">{signupError}</p>}

        <Button width="w-full" height="h-[50px]" color="blue" type="submit">
          {loading ? '회원가입 중...' : '회원가입'}
        </Button>
      </form>

      {/* 회원가입 결과 모달 */}
      <AlertModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleCloseModal}
        status="success"
        title="회원가입이 완료되었습니다!"
      />
    </>
  );
};

export default SignupForm;
