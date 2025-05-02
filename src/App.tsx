import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // BrowserRouter를 import
import HomePage from '@/pages/Home/HomePage';
import MainLayout from '@/layouts/MainLayout';
import LoginPage from './pages/Login/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
