import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // BrowserRouter를 import
import HomePage from './pages/Home/HomePage';
import MainLayout from './layouts/MainLayout';
import StatisticsPage from './pages/Statistic/StatisticPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
        <Route path="/statistic" element={<MainLayout><StatisticsPage /></MainLayout>} />
      </Routes>
    </Router>
  );
}

export default App;

