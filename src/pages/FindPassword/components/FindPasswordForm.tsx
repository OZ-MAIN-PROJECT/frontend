import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { SECURITY_QUESTIONS } from '@/constants/questions';
import { users } from '@/data/users';
import SecurityQuestion from '@/pages/Signup/components/SecurityQuestion';
import { isValidEmail } from '@/utils/validators';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FindPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [emailError, setEmailError] = useState('');
  const [formError, setFormError] = useState('');

  const navigate = useNavigate();

  // 이메일 유효성 검사
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    const error = isValidEmail(value) ? '' : '올바른 이메일 형식이 아닙니다.';
    setEmailError(error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, question, answer });

    const isFormValid = email && question && answer && !emailError;
    if (!isFormValid) {
      setFormError('모든 필드를 입력해주세요.');
    }
    // TODO 서버에 검증 요청
    const foundUser = users.find(u => u.email === email && u.question === question && u.answer === answer);
    if (foundUser) {
      console.log('본인확인 성공');
      navigate('/change-password', { state: { fromFindPassword: true } });
    } else {
      console.log('본인확인 실패');
      setFormError('등록된 회원 정보를 찾을 수 없습니다.')
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-[500px]">
      <Input className="w-full h-[60px]" placeholder="이메일" value={email} onChange={handleEmailChange} />
      {emailError && <p className="text-sm text-accent-red">{emailError}</p>}
      {/* 본인확인용 질문 */}
      <SecurityQuestion
        questions={SECURITY_QUESTIONS}
        question={question}
        answer={answer}
        onChange={(field, value) => {
          if (field === 'question') setQuestion(value);
          if (field === 'answer') setAnswer(value);
        }}
      />

      {/* 모든 입력필드 작성 및 유효성 검사 확인 */}
      {formError && <p className="text-sm text-accent-red text-center mt-1 mb-4">{formError}</p>}
      <Button type="submit" width="w-full">
        비밀번호 찾기
      </Button>
    </form>
  );
};

export default FindPasswordForm;
