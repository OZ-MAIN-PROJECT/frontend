import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { SECURITY_QUESTIONS } from '@/constants/questions';
import SecurityQuestion from '@/pages/Signup/components/SecurityQuestion';
import { isValidEmail } from '@/utils/validators';
import { useState } from 'react';

const FindPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [emailError, setEmailError] = useState('');

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
    // TODO 서버에 검증 요청
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
      <Button type="submit" width="w-full">
        비밀번호 찾기
      </Button>
    </form>
  );
};

export default FindPasswordForm;
