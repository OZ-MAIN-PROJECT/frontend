import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // BrowserRouter를 import
import HomePage from './pages/Home/HomePage';
import MainLayout from './layouts/MainLayout';
import TestPostCard from './pages/TestPostCard';
import PostDetail from './components/community/PostDetail';
import PostWrite from './pages/Community/PostWrite';
import LoginPage from './pages/Login/LoginPage';
import SignupPage from './pages/Signup/SignupPage';
import FindPasswordPage from './pages/FindPassword/FindPasswordPage';
import ChangePasswordPage from './pages/ChangePassword/ChangePasswordPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* 홈 + 테스트 페이지는 한꺼번에 묶어서 렌더링 */}
        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />

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
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/find-password" element={<FindPasswordPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route
          path="/community-test"
          element={
            <MainLayout>
              <TestPostCard />{' '}
            </MainLayout>
          }
        />

        <Route
          path="/community/write"
          element={
            <MainLayout>
              <PostWrite />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
