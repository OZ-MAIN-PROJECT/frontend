import { useNavigate } from 'react-router-dom';
import { useUpdatePassword } from '@/hooks/auth/useUpdateProfile';
import ChangePasswordSuccessModal from './components/ChangePasswordSuccessModal';
import { useState } from 'react';
import ChangePasswordForm from './components/ChangePasswordForm';
import BaseModal from '@/components/common/Modal/BaseModal';

interface ModalProps {
  fromFindPassword?: boolean;
  isOpen : boolean;
  onClose: () => void;
}

const ChangePasswordModal = ({ fromFindPassword, isOpen, onClose }: ModalProps) => {
  const navigate = useNavigate();
  const { update } = useUpdatePassword();
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const handleChangePassword = async (password: string) => {
    const success = await update(password);
    setIsSuccess(success);
    return success;
  };

  const handleClose = () => {
    setIsSuccess(null);
    if (isSuccess) {
      if (fromFindPassword) {
        navigate('/login');
      } else {
        navigate('/mypage');
      }
    } else {
      onClose();
    }
  };

  return (
    <>
      <BaseModal isOpen={isOpen} onClose={handleClose}>
      <ChangePasswordForm onSubmit={handleChangePassword} />
      </BaseModal>
      {isSuccess !== null && <ChangePasswordSuccessModal isSuccess={isSuccess} onClose={handleClose} />}
    </>
  );
};

export default ChangePasswordModal;
