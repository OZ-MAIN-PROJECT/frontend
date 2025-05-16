import { logout } from '@/apis/authApi';
import { useAuthStore } from '@/stores/useAuthStore';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.warn('서버측 로그아웃 실패', err);
    } finally {
      useAuthStore.getState().setLogout();
      console.log('상태 초기화 후 /login 이동');
      navigate('/login');
    }
  };
  return handleLogout;
};