import { useModalStore } from '@/stores/useModalStore';
import { useDeleteWalletEntry, useWalletDetail } from '@/hooks/useWallet';
import Modal from '@/components/common/Modal/Modal';
import Button from '@/components/common/Button';
import WalletDetailView from '../WalletDetailView';
import WalletDeleteConfirmModal from './WalletDeleteConfirmModal';

export default function WalletDetailModal() {
  const { modalData, openModal, closeModal } = useModalStore();
  const modalDataEntry = modalData['walletDetail'] as { walletUuid: string } | undefined;
  const walletUuid = modalDataEntry?.walletUuid;

  const { data, isError } = useWalletDetail(walletUuid || '');
  const deleteMutation = useDeleteWalletEntry(); 

  const handleEdit = () => {
    if (!data) return;
    openModal('walletForm', {
      walletUuid,
      type: data.type,
    });
    closeModal('walletDetail');
  };

  const handleDelete = async () => {
    if (!walletUuid) return;

    try {
      await deleteMutation.mutateAsync(walletUuid); 
      closeModal('walletDetail');
      openModal('walletDeleteConfirm');
      window.location.reload();
    } catch (err) {
      console.error('삭제 실패:', err);
    }
  };
  return (
    <>
      <Modal modalKey="walletDetail" className="w-[800px]">
        {isError && <p className="text-center py-10 text-red-500">데이터를 불러오지 못했습니다.</p>}

        {data && (
          <div className="overflow-auto">
            <WalletDetailView data={data} disabled={true} />

            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Button color="primary" variant="fill" onClick={handleEdit}>
                수정
              </Button>
              <Button color="red" variant="fill" onClick={handleDelete}>
                삭제
              </Button>
            </div>
          </div>
        )}
      </Modal>
      <WalletDeleteConfirmModal />
    </>
  );
}
