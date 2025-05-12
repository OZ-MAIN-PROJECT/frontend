import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import MainLayout from './layouts/MainLayout';
import StatisticsPage from './pages/Statistic/StatisticPage';
import TestPostCard from './pages/TestPostCard';
import PostDetail from './components/community/PostDetail';
import PostWrite from './pages/Community/PostWrite';
import LoginPage from './pages/Login/LoginPage';
import SignupPage from './pages/Signup/SignupPage';
import FindPasswordPage from './pages/FindPassword/FindPasswordPage';
import ChangePasswordPage from './pages/ChangePassword/ChangePasswordPage';
import MyPage from './pages/myPage/MyPage';
import WalletPage from './pages/Wallet/WalletPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* 메인 페이지 */}
        <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />

        {/* 내역 페이지 */}
        <Route path="/wallet" element={<MainLayout><WalletPage /></MainLayout>} />

        {/* 통계 페이지 */}
        <Route path="/statistic" element={<MainLayout><StatisticsPage /></MainLayout>} />

        {/* 마이페이지 */}
        <Route path="/mypage" element={<MyPage />} />

        {/* 회원 관련 페이지 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/find-password" element={<FindPasswordPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />

        {/* 게시글 관련 페이지 */}
        <Route path="/community/:id" element={<MainLayout><PostDetail /></MainLayout>} />
        <Route path="/community/write" element={<MainLayout><PostWrite /></MainLayout>} />

        {/* 테스트용 페이지 (개발 완료 후 제거 예정) */}
        <Route path="/community-test" element={<MainLayout><TestPostCard /></MainLayout>} />
      </Routes>
    </Router>
  );
}

export default App;