import { updateNickname } from '@/apis/authApi';
import { useState } from 'react';

// 닉네임 수정
export const useUpdateNickname = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const update = async (nickname: string): Promise<boolean> => {
    if (!nickname.trim()) {
      setError('닉네임을 입력해주세요!');
      return false;
    }
    try {
      setLoading(true);
      setError('');

      await updateNickname(nickname);
      return true;
    } catch (err) {
      setError('닉네임 변경에 실패했습니다.');
      console.error('닉네임 변경 실패 : ', err);
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { update, loading, error };
};

