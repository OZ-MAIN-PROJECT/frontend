import { useEffect, useState } from 'react';
import Button from '@/components/common/Button';
import PasswordConfirm from '@/pages/Signup/components/PasswordConfirm';
import { usePasswordValidation } from '@/hooks/auth/usePasswordValidation';

interface Props {
  onSubmit: (password: string) => Promise<boolean>;
}

const ChangePasswordForm = ({ onSubmit }: Props) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const { passwordError, validatePassword } = usePasswordValidation();

  useEffect(() => {
    validatePassword(newPassword, confirm);
  }, [newPassword, confirm, validatePassword]);

  const handleChange = (field: 'password' | 'passwordConfirm', value: string) => {
    if (field === 'password') setNewPassword(value);
    if (field === 'passwordConfirm') setConfirm(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !confirm) {
      return setError('비밀번호를 입력해주세요.');
    }
    if (passwordError) {
      return setError('비밀번호 형식을 확인해주세요.');
    }
    const success = await onSubmit(newPassword);
    if (!success) {
      setError('비밀번호 변경에 실패했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-[500px] mb-10">
      <h2 className="text-2xl mb-10">변경할 비밀번호를 입력해주세요</h2>
      <div className="w-full">
        <PasswordConfirm
          password={newPassword}
          passwordConfirm={confirm}
          onChange={handleChange}
          error={passwordError}
        />
      </div>
      {error && <p className="text-sm text-accent-red my-1">{error}</p>}
      <Button type="submit" width="w-[500px]">비밀번호 변경하기</Button>
    </form>
  );
};

export default ChangePasswordForm;
