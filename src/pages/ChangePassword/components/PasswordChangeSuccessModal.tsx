import AlertModal from '@/components/common/Modal/AlertModal';

interface ModalProps {
  isSuccess: boolean;
  onClose: () => void;
}

const PasswordChangeSuccessModal = ({ isSuccess, onClose }: ModalProps) => {
  return (
    <AlertModal
      isOpen={true}
      onClose={onClose}
      status={isSuccess ? 'success' : 'forbidden'}
      title={isSuccess ? '비밀번호 변경 완료' : '비밀번호 변경 실패'}
      description={isSuccess ? '변경된 비밀번호로 로그인해주세요.' : '비밀번호를 다시 확인해주세요.'}
    />
  );
};
export default PasswordChangeSuccessModal;
