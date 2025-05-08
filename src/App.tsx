import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import MainLayout from './layouts/MainLayout';
import StatisticsPage from './pages/Statistic/StatisticPage';
import TestPostCard from './pages/TestPostCard';
import PostDetail from './components/community/PostDetail';
import LoginPage from './pages/Login/LoginPage';
import SignupPage from './pages/Signup/SignupPage';
import FindPasswordPage from './pages/FindPassword/FindPasswordPage';
import ChangePasswordPage from './pages/ChangePassword/ChangePasswordPage';
import MyPage from './pages/myPage/MyPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/statistic" element={<MainLayout><StatisticsPage /></MainLayout>} />
        {/* 홈 + 테스트 페이지는 한꺼번에 묶어서 렌더링 */}
        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/find-password" element={<FindPasswordPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/mypage" element={<MyPage />} />
        {/* PostDetail도 따로 MainLayout으로 감싸줌 */}
        <Route
          path="/community/:id"
          element={
            <MainLayout>
              <PostDetail />
            </MainLayout>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/find-password' element={<FindPasswordPage />} />
        <Route path='/change-password' element={<ChangePasswordPage />} />
        <Route path='/community-test' element={<TestPostCard />} />
      </Routes>
    </Router>
  );
}

export default App;