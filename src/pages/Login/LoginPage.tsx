import logo from '@/assets/logo.png';
import Welcome from '@/assets/images/welcome.png';
import LoginForm from './components/LoginForm';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen gap-20">
        {/* 왼쪽 로그인 영역 */}
        <div className='flex flex-col gap-4 text-center items-center'>
          <div className='mb-20'>
            <h2 className='text-4xl'>감정 가계부</h2>
            <img className='w-[290px]' src={logo} />
          </div>
          <LoginForm />
          <div className='flex gap-3 w-full my-4 text-gray-600'>
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