import { resetPassword, updatePassword } from '@/apis/authApi';
import { useState } from 'react';

export interface ChangePasswordParams {
  email?: string;
  currentPassword?: string;
  newPassword: string;
}

export const useChangePassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
  
  const changePassword = async ({ email, currentPassword, newPassword }: ChangePasswordParams) => {
    if (!newPassword.trim() || (!email && !currentPassword?.trim())) {
        setError('비밀번호를 입력해주세요!');
        return false;
      }
  
    try {
        setLoading(true);
        setError('');
  
      if (email) {
        // 비밀번호 찾기 후 재설정
        await resetPassword(email, newPassword);
      } else if (currentPassword) {
        // 일반 비밀번호 변경
        await updatePassword(currentPassword, newPassword);
      }
      return true;
    } catch (err) {
      console.error('비밀번호 변경 실패', err);
      return false;
    } finally {
        setLoading(false);
    }
  };
  return { changePassword ,loading, error };
};
