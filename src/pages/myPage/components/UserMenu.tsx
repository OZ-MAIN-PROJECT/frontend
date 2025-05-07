import BlankModal from '@/components/common/Modal/BlankModal';
import { Ban, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import WithdrawModal from './WithdrawModal';
import { useState } from 'react';
import AlertModal from '@/components/common/Modal/AlertModal';

const UserMenu = () => {
  const navigate = useNavigate();
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleWithdrawConfirm = () => {
    setIsWithdrawOpen(false);
    setIsAlertOpen(true);
  };

  return (
    <div className="py-4">
      <div
        className="flex justify-between py-4 border-b-2 border-t-2 cursor-pointer"
        onClick={() => {
          navigate('/change-password', { state: { fromFindPassword: false } });
        }}
      >
        <div className="flex gap-2 items-center">
          <Lock size={16} />
          <span>비밀번호 변경</span>
        </div>
        <span>&gt;</span>
      </div>
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
        children={<WithdrawModal onConfirm={handleWithdrawConfirm} onCancel={() => setIsWithdrawOpen(false)} />}
      />
      {/* 알림 모달 */}
      <AlertModal 
        status = "forbidden"
        isOpen = {isAlertOpen}
        onClose = {() => setIsAlertOpen(false)}
        title="탈퇴 완료"
        description ="탈퇴가 정상적으로 처리되었습니다."
      />
    </div>
  );
};

export default UserMenu;
