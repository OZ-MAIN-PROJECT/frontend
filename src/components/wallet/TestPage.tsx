import { useState } from 'react';
import Button from '../common/Button';
import AddWalletModal from './AddWalletModal';

export default function TestPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<'income' | 'expense' | null>(null);

  const openModal = (type: 'income' | 'expense') => {
    setType(type);
    setIsOpen(true);
  };
  return (
    <div className="flex gap-4 w-full h-full justify-center items-center">
      <Button onClick={() => openModal('income')} color="primary">
        수입
      </Button>
      <Button onClick={() => openModal('expense')} color="primary">
        지출
      </Button>
      {type && isOpen ? (
        <AddWalletModal
          type={type}
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            setType(null);
          }}
        />
      ) : (
        ''
      )}
    </div>
  );
}
