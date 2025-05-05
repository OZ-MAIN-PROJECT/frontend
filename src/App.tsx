import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // BrowserRouter를 import
import HomePage from '@/pages/Home/HomePage';
import MainLayout from '@/layouts/MainLayout';
import LoginPage from './pages/Login/LoginPage';
import SignupPage from './pages/Signup/SignupPage';
import FindPasswordPage from './pages/FindPassword/FindPasswordPage';
import ChangePasswordPage from './pages/ChangePassword/ChangePasswordPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/find-password' element={<FindPasswordPage />} />
        <Route path='/change-password' element={<ChangePasswordPage />} />
      </Routes>
    </Router>
  );
}

export default App;
