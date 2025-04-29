import CloseButton from './CloseButton';

const BaseModal = ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => {
  return (
    <div className="box-border fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-2xl shadow-xl w-[620px] p-[60px] pt-[150px] pb-[150px]">
        <CloseButton onClick={onClose} />
        {children}
      </div>
    </div>
  );
};

export default BaseModal;
