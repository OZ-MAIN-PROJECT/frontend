import Button from '@/components/common/Button';
import { AlertTriangle } from 'lucide-react';

interface WithdrawModalProps {
  onConfirm : () => void;
  onCancel : () => void;
}

const WithdrawModal = ({onConfirm, onCancel} : WithdrawModalProps) => {
  return (
    <div className="flex justify-center w-[500px] flex-col items-center text-center">
      <AlertTriangle size={60} color="#FF4B4A" />
      <h2 className="text-xl text-gray-800 mt-[34px]">정말로 탈퇴하시겠습니까?</h2>
        <div className="min-h-[20px] mt-[14px] text-accent-red">
        탈퇴 후 30일 이내에 같은 계정으로 해당 서비스에 가입할 수 없습니다.
        </div>
        <div className="mt-[112px] flex gap-2">
          <Button onClick={onConfirm}>확인</Button>     
          <Button onClick={onCancel} color='gray'>취소</Button>
        </div>
    </div>
  );
};

export default WithdrawModal;