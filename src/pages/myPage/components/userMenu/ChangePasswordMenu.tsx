import ChangePasswordModal from '@/pages/ChangePassword/ChangePasswordModal';
import { Lock } from 'lucide-react';
import { useState } from 'react';

function ChangePasswordMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div
        className="flex justify-between py-4 border-b-2 border-t-2 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex gap-2 items-center dark:text-white">
          <Lock size={16} />
          <span>비밀번호 변경</span>
        </div>
        <span className="dark:text-white">&gt;</span>
      </div>

      {isOpen && (
        <ChangePasswordModal
          isOpen={isOpen}
          onClose={handleClose}
        />
      )}
    </>
  );
}

export default ChangePasswordMenu;
