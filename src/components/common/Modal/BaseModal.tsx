import React, { useEffect } from 'react';
import CloseButton from './CloseButton';

type BaseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const BaseModal = ({ isOpen, onClose, children }: BaseModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* 바깥 클릭시 닫기 */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* 모달 콘텐츠 */}
      <div
        className="modal-wrapper relative bg-white dark:bg-dark-800 rounded-2xl shadow-xl w-[350px] sm:w-[620px] p-4 sm:p-[60px] pt-[50px] sm:pt-[150px]"
        onClick={e => e.stopPropagation()} // 모달 내부 클릭은 닫히지 않게 막기
      >
        <CloseButton onClick={onClose} />
        {children}
      </div>
    </div>
  );
};

export default BaseModal;
