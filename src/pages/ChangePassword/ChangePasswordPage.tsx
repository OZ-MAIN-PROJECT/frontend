import { useLocation, useNavigate } from "react-router-dom"
import ChangePasswordModal from "./components/ChangePasswordModal";

const ChangePasswordPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // 비밀번호 찾기에서 온건지 체크
    const fromFindPassword = location.state?.fromFindPassword;

    const handleClose = () => {
        if (fromFindPassword) {
            navigate('/login');
        } else {
            navigate('/mypage')
        }
    }

    const handleChangePassword = (newPassword : string) => {
        console.log('비밀번호 변경 : ', newPassword);
        // TODO : 비밀번호 변경 API 요청 처리 후 handleClose 호출
        handleClose();
    }

    return (
        <ChangePasswordModal 
            isOpen={true} 
            onClose={handleClose}
            onSubmit={handleChangePassword} 
        />
    );
}

export default ChangePasswordPage;