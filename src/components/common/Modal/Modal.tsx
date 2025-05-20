import { useModalStore } from "@/stores/useModalStore";
import CloseButton from "./CloseButton";
import { useEffect } from "react";

type ModalProps = {
  modalKey: string;
  children: React.ReactNode;
  className?: string;
};

const Modal = ({ modalKey, children, className="" }: ModalProps) => {
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
      <div className={`modal-wrapper relative bg-white dark:bg-dark-800 rounded-2xl shadow-xl max-h-screen md:max-w-full max-w-4xl p-[60px] ${className}`}
      onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={() => closeModal(modalKey)} />

        {/* children 부분만 세로 스크롤 */}
        <div className="overflow-y-auto max-h-[70vh] pr-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
