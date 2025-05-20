import Welcome from '@/assets/images/welcome.png';
import LoginForm from './components/LoginForm';
import { Link } from 'react-router-dom';
import Logo from '@/components/common/Logo';

const LoginPage = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen gap-20 dark:bg-gray-900">
        {/* 왼쪽 로그인 영역 */}
        <div className='flex flex-col gap-4 text-center items-center'>
          <div className='mb-5 sm:mb-20'>
            <h2 className='text-xl sm:text-4xl'>감정 가계부</h2>
            <Logo />
          </div>
          <LoginForm />
          <div className='flex gap-3 w-[300px] sm:w-[500px] my-4 text-gray-600'>
                <p>회원이 아니신가요?</p>
                <Link to='/signup' className='underline'>회원가입</Link>
                <Link to='/find-password' className='underline'>비밀번호 찾기</Link>
            </div>
        </div>
        {/* 오른쪽 이미지 영역 */}
        <div className="hidden xl:block">
          <img className='max-w-[650px]' src={Welcome} />
        </div>
      </div>
    </>
  );
};

export default LoginPage;