import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import MainLayout from './layouts/MainLayout';
import TestPostCard from './pages/TestPostCard';

function App() {
  return (
    <Router>
      <Route
        path="/"
        element={
          <MainLayout>
            <HomePage />
            <TestPostCard />
          </MainLayout>
        }
      />
    </Router>
  );
}

export default App;
