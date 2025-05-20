import FindPasswordForm from './components/FindPasswordForm';
import { useState } from 'react';
import ChangePasswordModal from '../ChangePassword/ChangePasswordModal';
import Logo from '@/components/common/Logo';

const FindPasswordPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <div className="flex flex-col items-center h-full min-h-screen bg-gray-200 dark:bg-gray-900">
      <div className="my-10 flex flex-col items-center w-[350px] sm:min-w-[700px] border-b-2 border-gr">
        <Logo />
        <h2 className='text-center font-semibold text-xl sm:text-3xl'>비밀번호 찾기</h2>
        <p className='my-8 text-center text-gray-800 text-sm sm:text-xl'>가입 시 등록한 정보를 입력해 주세요. <br/>
        입력하신 정보를 확인한 후, 비밀번호 재설정 안내를 드립니다.</p>
      </div>
      <div className="felx felx-col h-full justify-center">
        <FindPasswordForm onVerified={(verifiedEmail) => {
          setEmail(verifiedEmail)
          setIsOpen(true)}} />
      </div>
      {isOpen && (
        <ChangePasswordModal isOpen={isOpen} onClose={() => setIsOpen(false)} isFromFindPassword={true} email={email}/>
      )}
    </div>
  );
};

export default FindPasswordPage;