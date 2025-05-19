import BlankModal from '@/components/common/Modal/BlankModal';
import ChangePasswordForm from './components/ChangePasswordForm';
import PasswordChangeSuccessModal from './components/PasswordChangeSuccessModal';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUpdatePassword } from '@/hooks/auth/useUpdateProfile';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordModal = ({ isOpen, onClose }: Props) => {
  const navigate = useNavigate();
  const { update } = useUpdatePassword();
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const handleChangePassword = async (currentPassword: string, newPassword: string) => {
    const success = await update(currentPassword, newPassword);
    setIsSuccess(success);
    return success;
  };

  const handleClose = () => {
    setIsSuccess(null);
    onClose(); // 모달 닫기

    if (isSuccess) navigate('/mypage');
  };

  return (
    <>
      <BlankModal isOpen={isOpen} onClose={handleClose}>
        <div className="flex flex-col justify-center items-center w-[300px] sm:w-[500px]">
          <h2 className='text-xl sm:text-2xl font-semibold mb-10'>비밀번호 변경</h2>
          <ChangePasswordForm onSubmit={handleChangePassword} />
        </div>
      </BlankModal>

      {isSuccess !== null && <PasswordChangeSuccessModal isSuccess={isSuccess} onClose={handleClose} />}
    </>
  );
};

export default ChangePasswordModal;
