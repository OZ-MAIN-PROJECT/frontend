// import BlankModal from '../common/Modal/BlankModal';
import AddWalletForm from './AddWalletForm';

interface AddWalletModalProps {
  type : 'expense' | 'income';
  // onClose : () => void;
}

export default function AddWalletModal({type} : AddWalletModalProps) {
  return (
    // <BlankModal>
      <div className="flex flex-col justify-start p-10 ">
        <AddWalletForm type={type}/>
      </div>
    // </BlankModal>
  );
}
