import { signup, SignupPayload } from '@/apis/authApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSignup = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSignup = async (payload: SignupPayload) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await signup(payload);
      if (response.message === '회원가입 완료') {
        setSuccess(true);
        navigate('/login');
        console.log('회원가입 성공!');
      }
    } catch (err) {
      setError('회원가입에 실패했습니다.');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return {
    signup: handleSignup,
    loading,
    error,
    success,
  };
};
