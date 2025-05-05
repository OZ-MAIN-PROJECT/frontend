import { useEffect, useState } from 'react';
import Button from '@/components/common/Button';
import BaseModal from '@/components/common/Modal/BaseModal';
import PasswordConfirm from '@/pages/Signup/components/PasswordConfirm';
import { usePasswordValidation } from '@/hooks/usePasswordValidation';
import AlertModal from '@/components/common/Modal/AlertModal';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (pw: string) => void;
}

const ChangePasswordModal = ({ isOpen, onClose, onSubmit }: ChangePasswordModalProps) => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  // 회원가입 완료 안내 모달
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { passwordError, validatePassword } = usePasswordValidation();

  useEffect(() => {
    if (password || confirm) {
      validatePassword(password, confirm);
    }
  }, [password, confirm, validatePassword]);

  const handlePasswordChange = (field: 'password' | 'passwordConfirm', value: string) => {
    if (field === 'password') setPassword(value);
    if (field === 'passwordConfirm') setConfirm(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirm) {
      return setError('비밀번호를 입력해주세요.');
    }
    if (passwordError) {
      return setError('비밀번호 형식을 확인해주세요.');
    }
    setError('');

    console.log('비밀번호 변경 시도:', password);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <BaseModal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-[500px] mb-10">
          <h2 className="text-2xl mb-10">변경할 비밀번호를 입력해주세요</h2>
          <div className="w-full">
            <PasswordConfirm
              password={password}
              passwordConfirm={confirm}
              onChange={handlePasswordChange}
              error={passwordError}
            />
          </div>
          {error && <p className="text-sm text-accent-red my-1">{error}</p>}
          <Button type="submit" width="w-[500px]">
            비밀번호 변경하기
          </Button>
        </form>
      </BaseModal>

      {/* 비밀번호 수정 결과 모달 */}
      <AlertModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={() => {
            setIsModalOpen(false);
            onSubmit(password);
        }}
        status="success"
        title="회원 정보가 수정에 성공했습니다!"
        description="변경된 비밀번호로 로그인해주세요."
      />
    </>
  );
};

export default ChangePasswordModal;
