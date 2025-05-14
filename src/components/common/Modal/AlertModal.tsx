import { AlertModalProps } from '@/types/modal';
import BaseModal from './BaseModal';
import Icon from './Icon';

const AlertModal = ({ isOpen, onClose, status, title, description, confirmText, onConfirm }: AlertModalProps) => {
  if (!isOpen) return null;

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center text-center">
        <Icon status={status} />
        <h2 className="text-xl text-gray-800 mt-[34px]">{title}</h2>
        <div className="min-h-[20px] mt-[14px]">
          {description ? <p className="text-sm text-gray-500 whitespace-pre-line">{description}</p> : null}
        </div>
        <div className="mt-[112px]">
          {confirmText || (
            <button onClick={onConfirm || onClose} className="text-primary-500 underline text-sm">
              확인
            </button>
          )}
        </div>
      </div>
    </BaseModal>
  );
};

export default AlertModal;
