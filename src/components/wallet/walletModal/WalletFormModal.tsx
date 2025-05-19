import { useModalStore } from "@/stores/useModalStore";
import Modal from "../../common/Modal/Modal";
import WalletForm from "../WalletForm";
import { useCreateWalletEntry, useUpdateWalletEntry, useWalletDetail } from "@/hooks/useWallet";
import { WalletFormData } from "@/types/wallet";

export default function WalletFormModal() {
  const { modalData, closeModal } = useModalStore();
  const modalDataEntry = modalData["walletForm"] as { walletUuid?: string; type?: "INCOME" | "EXPENSE" } | undefined;
  const walletUuid = modalDataEntry?.walletUuid;
  const type = modalDataEntry?.type || "EXPENSE";

  const { data, isLoading } = useWalletDetail(walletUuid || "");

  const createMutation = useCreateWalletEntry();
  const updateMutation = useUpdateWalletEntry();

  const handleSubmit = async (form: WalletFormData) => {
    const payload = {
      title: form.title,
      content: form.content,
      amount: form.amount,
      type: type.toUpperCase() as "INCOME" | "EXPENSE",
      walletCategory: form.walletCategory ?? "",
      emotion: form.emotion,
      date: form.date.toISOString().split("T")[0], // YYYY-MM-DD 형식
    };

    try {
      if (walletUuid && data) {
        // 수정
        await updateMutation.mutateAsync({ walletUuid, data: payload });
        window.location.reload();
        console.log('수정')

      } else {
        // 등록 
        await createMutation.mutateAsync(payload);
        window.location.reload();
        console.log('등록')
      }
      closeModal("walletForm");
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <Modal modalKey="walletForm" className="w-[800px]">
      {isLoading ? (
        <p className="text-center py-10">불러오는 중...</p>
      ) : (
        <WalletForm type={type} data={data} onSubmit={handleSubmit} />
      )}
    </Modal>
  );
}
