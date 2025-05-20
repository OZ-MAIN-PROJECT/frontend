import Modal from '@/components/common/Modal/Modal';
import { useModalStore } from '@/stores/useModalStore';
import { Trash } from 'lucide-react';

const WalletDeleteConfirmModal = () => {
  const { closeModal } = useModalStore();

  return (
    <Modal modalKey="walletDeleteConfirm">
      <div className="flex flex-col items-center text-center text-accent-red w-[200px] sm:w-[620px] pt-10 sm:pt-[150px]">
        <Trash size={60}/>
        <h2 className="text-xl text-gray-800 mt-[34px]">내역 삭제</h2>
        <div className="min-h-[20px] mt-[14px]">
          <p className="text-sm text-gray-500 whitespace-pre-line">성공적으로 삭제되었습니다.</p>
        </div>
        <div className="mt-4 sm:mt-[112px]">
          <button onClick={() => {
            closeModal('walletDeleteConfirm')
          }} className="text-primary-500 underline text-sm">
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default WalletDeleteConfirmModal;
