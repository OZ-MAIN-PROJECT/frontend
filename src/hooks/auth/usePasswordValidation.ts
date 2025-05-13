import { isValidPassword } from '@/utils/validators';
import { useState } from 'react';

export const usePasswordValidation = () => {
  const [error, setError] = useState('');

  const validate = (password: string, confirm: string) => {
    if (!isValidPassword(password)) {
      setError('비밀번호는 영문 대소문자, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.');
      return false;
    }
    if (password && confirm && password !== confirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return false;
    }
    setError('');
    return true;
  };

  return {
    passwordError: error,
    validatePassword: validate,
  };
};
