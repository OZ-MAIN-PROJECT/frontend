import AlertModal from '@/components/common/Modal/AlertModal';
import BlankModal from '@/components/common/Modal/BlankModal';
import { Ban } from 'lucide-react';
import { useState } from 'react';
import ConfirmModal from '../ConfirmModal';

const WithdrawMenu = () => {
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleWithdrawConfirm = () => {
    setIsWithdrawOpen(false);
    setIsAlertOpen(true);
  };
  return (
    <>
      <div className="flex justify-between py-4 border-b-2 cursor-pointer">
        <div className="flex gap-2 items-center text-accent-red" onClick={() => setIsWithdrawOpen(true)}>
          <Ban size={16} />
          <span className="">회원탈퇴</span>
        </div>
        <span>&gt;</span>
      </div>
      {/* 탈퇴 모달 */}
      <BlankModal
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        children={<ConfirmModal onConfirm={handleWithdrawConfirm} />}
      />
      {/* 알림 모달 */}
      <AlertModal
        status="forbidden"
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        title="탈퇴 완료"
        description="탈퇴가 정상적으로 처리되었습니다."
      />
    </>
  );
};

export default WithdrawMenu;
