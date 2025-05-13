import { deleteUser } from "@/apis/authApi";
import { useState } from "react";

export const useConfirmWithdraw = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const confirmWithdraw = async (password : string) : Promise<boolean> => {
        if (password.trim() === '') {
            setError('비밀번호를 입력하세요.');
            return false;
          }
          try {
              setLoading(true);
              setError('');

              await deleteUser(password);

              return true;
          } catch(err) {
              setError('비밀번호가 올바르지 않습니다.');
              console.error('탈퇴 요청 실패 : ', err);
              return false;
          } finally{
              setLoading(false);
          }
    }
    return {
        confirmWithdraw,
        loading,
        error
    }
}
