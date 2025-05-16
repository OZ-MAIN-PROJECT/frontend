import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import AlertModal from '@/components/common/Modal/AlertModal';
import { useConfirmWithdraw } from '@/hooks/auth/useConfirmWithdraw';
import { Lock } from 'lucide-react';
import React, { useState } from 'react';

const ConfirmModal = ({ onConfirm }: { onConfirm: () => void }) => {
  const [password, setPassword] = useState('');
  const { confirmWithdraw, loading, error } = useConfirmWithdraw();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await confirmWithdraw(password);
    if (success) {
      onConfirm();
      setIsAlertOpen(true);
    }
  };

  return (
    <div className="flex justify-center w-[500px] flex-col items-center text-center mb-10">
      <Lock size={60} color="#2D60FF" />
      <h2 className="text-xl text-gray-800 mt-[34px]">본인 확인을 위해 비밀번호를 입력해주세요.</h2>
      <div className="min-h-[20px] mt-[14px] text-accent-red">
        탈퇴 후 30일 이내에 같은 계정으로 해당 서비스에 가입할 수 없습니다.
        </div>
      <form className="flex flex-col w-[500px] my-8" onSubmit={handleSubmit}>
        <Input
          className="w-full h-[60px]"
          value={password}
          placeholder="비밀번호"
          onChange={e => setPassword(e.target.value)}
          type="password"
        />
        <Button width="w-full" type="submit">
          {loading ? '처리 중...' : '확인'}
        </Button>
        {error && <p className="mt-4 text-sm text-accent-red">{error}</p>}
      </form>
      {/* 알림 모달 */}
      <AlertModal
        status="forbidden"
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        title="탈퇴 완료"
        description="탈퇴가 정상적으로 처리되었습니다."
      />
    </div>
  );
};

export default ConfirmModal;
