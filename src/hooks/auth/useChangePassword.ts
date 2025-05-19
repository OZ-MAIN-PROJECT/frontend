import { resetPassword, updatePassword } from '@/apis/authApi';

export interface ChangePasswordParams {
  email?: string;
  currentPassword?: string;
  newPassword: string;
}

export const useChangePassword = () => {
  const changePassword = async ({ email, currentPassword, newPassword }: ChangePasswordParams) => {
    try {
      if (email) {
        // 비밀번호 찾기 후 재설정
        await resetPassword(email, newPassword);
      } else if (currentPassword) {
        // 일반 비밀번호 변경
        await updatePassword(currentPassword, newPassword);
      }
      return true;
    } catch (err) {
      console.error('비밀번호 변경 실패', err);
      return false;
    }
  };
  return { changePassword };
};
