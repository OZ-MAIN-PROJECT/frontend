import BlankModal from '@/components/common/Modal/BlankModal';
import ChangePasswordForm from './components/ChangePasswordForm';
import PasswordChangeSuccessModal from './components/PasswordChangeSuccessModal';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ChangePasswordParams, useChangePassword } from '@/hooks/auth/useChangePassword';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isFromFindPassword?: boolean;
  email?: string;
}

const ChangePasswordModal = ({ isOpen, onClose, isFromFindPassword = false, email }: Props) => {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const { changePassword } = useChangePassword();

  const handleChangePassword = async (params: ChangePasswordParams) => {
    const success = await changePassword(params);
    setIsSuccess(success);
    return success;
  };

  const handleClose = () => {
    setIsSuccess(null);
    onClose(); // 모달 닫기

    if (isSuccess && isFromFindPassword) navigate('/login');
    if (isSuccess && !isFromFindPassword) navigate('/mypage');
  };

  return (
    <>
      <BlankModal isOpen={isOpen} onClose={handleClose}>
        <div className="flex flex-col justify-center items-center w-[500px]">
          <h2 className="text-2xl font-semibold mb-10 dark:text-white">비밀번호 변경</h2>
          <ChangePasswordForm onSubmit={handleChangePassword} isFromFindPassword={isFromFindPassword} email={email} />
        </div>
      </BlankModal>

      {isSuccess !== null && <PasswordChangeSuccessModal isSuccess={isSuccess} onClose={handleClose} />}
    </>
  );
};

export default ChangePasswordModal;
