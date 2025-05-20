import Logo from '@/components/common/Logo';
import SignupForm from './components/SignupForm';

const SignupPage = () => {
  return (
    <div className="flex flex-col items-center h-full min-h-screen bg-gray-200 dark:bg-gray-900">
      <div className="my-4 sm:my-10">
        <Logo />
        <h2 className='text-center font-semibold text-xl sm:text-3xl'>회원가입</h2>
      </div>
      <div className="felx felx-col h-full justify-center">
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;