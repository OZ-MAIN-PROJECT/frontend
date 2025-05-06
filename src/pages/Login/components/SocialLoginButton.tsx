import KakaoLogin from '@/assets/images/KakaoLogin.png';
import NaverLogin from '@/assets/images/NaverLogin.png';
import GoogleLogin from '@/assets/images/GoogleLogin.png';

type SocialType = 'kakao' | 'naver' | 'google';

interface SocialLoginProps {
  type: SocialType;
  onClick: () => void;
}

const SocialLoginButton = ({ type, onClick }: SocialLoginProps) => {
  const imageMap: Record<SocialType, string> = {
    kakao: KakaoLogin,
    naver: NaverLogin,
    google: GoogleLogin,
  };

  return (
    <button className="cursor-pointer m-0 p-0 border-none bg-transparent" onClick={onClick}>
      <img src={imageMap[type]} alt={`${type} 로그인`} className="w-full h-auto" />
    </button>
  );
};

export default SocialLoginButton;