import { BlankModalProps } from '@/types/modal';
import BaseModal from './BaseModal';

const BlankModal = ({ isOpen, onClose, width = '620px', height = 'auto', children }: BlankModalProps) => {
  if (!isOpen) return null;

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4" style={{ width, height }}>
        {children}
      </div>
    </BaseModal>
  );
};

export default BlankModal;
