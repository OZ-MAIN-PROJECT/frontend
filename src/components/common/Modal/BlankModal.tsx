import BaseModal from './BaseModal';

const BlankModal = ({ isOpen, onClose, children }: BlankModalProps) => {
  if (!isOpen) return null;

  return (
    <BaseModal onClose={onClose}>
      <div className="flex flex-col gap-4">{children}</div>
    </BaseModal>
  );
};

export default BlankModal;
