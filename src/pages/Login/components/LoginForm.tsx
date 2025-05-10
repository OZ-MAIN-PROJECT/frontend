import { useState } from 'react';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { isValidEmail } from '@/utils/validators';
import { useLogin } from '@/hooks/useLogin';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, error: loginError, loading } = useLogin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('올바른 이메일 형식이 아닙니다.');
      return;
    }

    // TODO: 서버 로그인 요청 처리
    setError('');
    await login(email, password);
    console.log('로그인 시도:', { email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-[500px]">
      <Input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="h-[60px] w-full"
        required
      />

      <Input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="h-[60px] w-full"
        required
      />

      {(error || loginError) && <p className="text-sm text-red-500">{error || loginError}</p>}

      <Button width="w-full" height="h-[50px]" color="blue" type="submit">
        {loading ? '로그인 중....' : '로그인'}
      </Button>
    </form>
  );
};

export default LoginForm;
