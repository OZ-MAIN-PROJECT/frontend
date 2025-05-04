import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import MainLayout from './layouts/MainLayout';
import TestPostCard from './pages/TestPostCard';
import PostDetail from './components/community/PostDetail';
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
              <TestPostCard />
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
      </Routes>
    </Router>
  );
}

export default App;
