import { UserRound } from 'lucide-react';

const InformationCard = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex justify-center items-center w-[60px] h-[60px] bg-primary-800 rounded-full mr-1.5">
          <UserRound size={'60px'} className="text-white" />
        </div>
        <div>
          <p className="font-semibold text-lg">
            닉네임 <span className="text-sm text-blue-500 cursor-pointer">수정</span>
          </p>
          <p className="text-sm text-red-500">이미 사용중인 닉네임입니다. 다른 이름으로 시도해주세요.</p>
          <p className="text-sm text-gray-500">test123@mail.com</p>
        </div>
      </div>
    </div>
  );
};

export default InformationCard;
