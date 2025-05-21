import { Crown, UserRound } from 'lucide-react';
import NicknameEditor from './NicknameEditor';

interface InformationCardProps {
  nickname: string;
  email: string;
  role: string;
}

const InformationCard = ({ nickname, email, role }: InformationCardProps) => {
  return (
    <>
      {role === 'admin' && (
        <div className="flex items-center py-1 justify-center gap-1 bg-primary-800 dark:bg-white/10 w-[90px] text-center text-sm rounded-full text-white">
          <Crown size={16}/>
          admin</div>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 my-4">
          <div className="flex justify-center items-center w-[60px] h-[60px] bg-primary-800 dark:bg-white/10 rounded-full mr-1.5">
            <UserRound size={'60px'} className="text-white" />
          </div>
          <div>
            <NicknameEditor currentNickname={nickname} />
            <p className="text-sm text-gray-500">{email}</p>{' '}
          </div>
        </div>
      </div>
    </>
  );
};

export default InformationCard;
