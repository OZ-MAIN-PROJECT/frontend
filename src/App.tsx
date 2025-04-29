import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // BrowserRouter를 import
import HomePage from './pages/Home/HomePage';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
      </Routes>
    </Router>
  );
}

export default App;

