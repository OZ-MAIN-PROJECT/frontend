import { login } from "@/apis/auth";
import { useAuthStore } from "@/stores/useAuthStore";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    // 로그인 상태는 전역으로 관리
    const setAuth = useAuthStore(state => state.setAuth);
    const navigate = useNavigate();

    const handleLogin = async (email : string, password : string) => {
        setLoading(true);
        setError(null);
        try {
            const {access_token, nickname} = await login({email, password});
            setAuth(access_token, {nickname});
            console.log('로그인 성공!')
            navigate('/');
        } catch (err) {
            setError('이메일 또는 비밀번호가 올바르지 않습니다.');
            console.log(err);
        } finally {
            setLoading(false);
        }
    }
    return {
        login : handleLogin,
        loading,
        error,
    }
}