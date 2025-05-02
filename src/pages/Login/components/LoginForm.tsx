import { useState } from 'react';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    // TODO: 서버 로그인 요청 처리
    console.log('로그인 시도:', { email, password });
    setError('');
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

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button width="w-full" height="h-[50px]" color="blue">
        로그인
      </Button>
    </form>
  );
};

export default LoginForm;
