import { emailDuplicateCheck, nicknameDuplicateCheck } from '@/apis/authApi';
import { useState } from 'react';

type DuplicateCheckType = 'email' | 'nickname';

export const useDuplicateCheck = () => {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const check = async (type : DuplicateCheckType, value : string) : Promise<string | null> => {
    let data;
    try {
        if (type === 'email') {
            data = await emailDuplicateCheck(value);
            if (data.email) {
                setStatus('error');
                setMessage(data.email);
                return data.email;
            }
        } else {
            data = await nicknameDuplicateCheck(value);
            if (data.nickname){
                setStatus('error');
                setMessage(data.nickname);
                return data.nickname;
            }
        }
        setStatus('success');
        setMessage('사용 가능합니다.');
        return null;
    } catch(err) {
        console.log('중복 확인 실패', err);
        setStatus('error');
        setMessage('중복 확인 중 오류 발생');
        return '중복 확인 실패'
    }
  }

  const reset = () => {
    setStatus('idle');
    setMessage('');
  }

  return {
    check, status, message, reset
  }
};
