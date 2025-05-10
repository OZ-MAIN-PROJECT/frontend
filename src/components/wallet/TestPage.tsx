import { useState } from 'react';
import AddWalletModal from './AddWalletModal';
import Button from '../common/Button';

export default function TestPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <Button onClick={() => setIsOpen(!isOpen)} color="primary">
        {!isOpen? '추가' : '닫기'}
      </Button>
      {isOpen ? <AddWalletModal /> : ''}
    </div>
  );
}
