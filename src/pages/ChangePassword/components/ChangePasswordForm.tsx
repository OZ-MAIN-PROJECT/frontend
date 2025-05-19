import { useState } from 'react';
import { usePasswordValidation } from '@/hooks/auth/usePasswordValidation';
import PasswordConfirm from '@/pages/Signup/components/PasswordConfirm';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

interface Props {
  onSubmit: (params: { email?: string; currentPassword?: string; newPassword: string }) => Promise<boolean>;
  isFromFindPassword?: boolean;
  email?: string;
}

const ChangePasswordForm = ({ onSubmit, isFromFindPassword, email }: Props) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const { passwordError, validatePassword } = usePasswordValidation();

  const handleFiledChange = (filed: 'password' | 'passwordConfirm', value: string) => {
    if (filed === 'password') setNewPassword(value);
    if (filed === 'passwordConfirm') setConfirm(value);
  };

  const handleSubmit = async () => {
    if ((!isFromFindPassword && !currentPassword) || !newPassword || !confirm) {
      setError('모든 비밀번호를 입력해주세요.');
      return;
    }
    if (newPassword !== confirm) {
      setError('새로운 비밀번호가 일치하지 않습니다.');
      return;
    }
    const isValid = validatePassword(newPassword, confirm);
    if (!isValid) return;

    const success = await onSubmit({
      email,
      currentPassword: isFromFindPassword ? undefined : currentPassword,
      newPassword,
    });
    if (!success) {
      setError('비밀번호 변경에 실패했습니다.');
    } else {
      setError('');
    }
  };

  return (
    <form className="flex flex-col items-center gap-4 w-full mb-10">
      {!!isFromFindPassword && (
        <>
          <p className="text-gray-600 ">현재 비밀번호 입력</p>
          <Input
            className="h-[60px] w-[500px]"
            type="password"
            value={currentPassword}
            placeholder="현재 비밀번호를 입력해주세요."
            onChange={e => setCurrentPassword(e.target.value)}
          />
        </>
      )}
      <p className="text-gray-600 ">새로운 비밀번호 입력</p>
      <PasswordConfirm
        password={newPassword}
        passwordConfirm={confirm}
        onChange={handleFiledChange}
        error={passwordError}
      />
      {error && <p className="text-sm text-accent-red my-1">{error}</p>}
      <Button type="button" width="w-[500px]" onClick={handleSubmit}>
        비밀번호 변경하기
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
