import CloseButton from '../common/Modal/CloseButton';
import AddWalletForm from './AddWalletForm';

interface AddWalletModalProps {
  type : 'expense' | 'income';
  isOpen : boolean;
  onClose : () => void;
}

export default function AddWalletModal({type, isOpen, onClose} : AddWalletModalProps) {
  return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 py-5 px-10 z-[999]">
        <div className="absolute inset-0 " onClick={onClose} />
          <div
          className="modal-wrapper relative bg-white rounded-2xl shadow-xl"
          onClick={e => e.stopPropagation()} 
        >
          <CloseButton onClick={onClose} />
          <div className="flex flex-col justify-start p-10 ">
        {type && isOpen && (
          <AddWalletForm type={type}/>
        )}
      </div>
        </div>
      </div>
  );
}