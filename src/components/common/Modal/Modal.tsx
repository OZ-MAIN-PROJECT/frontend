import { useModalStore } from "@/stores/useModalStore";
import CloseButton from "./CloseButton";
import { useEffect } from "react";

type ModalProps = {
  modalKey: string;
  children: React.ReactNode;
};

const Modal = ({ modalKey, children }: ModalProps) => {
  const { modals, closeModal } = useModalStore();
  const isOpen = modals[modalKey] ?? false;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal(modalKey);
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, modalKey, closeModal]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="absolute inset-0" onClick={() => closeModal(modalKey)} />
      <div
        className="modal-wrapper relative bg-white rounded-2xl shadow-xl max-w-1/2 p-[60px]"
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton onClick={() => closeModal(modalKey)} />
        {children}
      </div>
    </div>
  );
};

export default Modal;
