import { UserRound } from 'lucide-react';
import NicknameEditor from './NicknameEditor';

const InformationCard = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4 my-4">
        <div className="flex justify-center items-center w-[60px] h-[60px] bg-primary-800 rounded-full mr-1.5">
          <UserRound size={'60px'} className="text-white" />
        </div>
        <div>
          <NicknameEditor currentNickname="gildong" />
          <p className="text-sm text-gray-500">test123@mail.com</p>{' '}
        </div>
      </div>
    </div>
  );
};

export default InformationCard;
