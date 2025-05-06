import logo from '@/assets/logo.png';
import SignupForm from './components/SignupForm';

const SignupPage = () => {
  return (
    <div className="flex flex-col items-center h-full min-h-screen bg-gray-200">
      <div className="my-10">
        <img className="w-[290px] my-10" src={logo}/>
        <h2 className='text-center font-semibold text-3xl'>회원가입</h2>
      </div>
      <div className="felx felx-col h-full justify-center">
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;