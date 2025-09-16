import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import GardenPage from './pages/GardenPage';
import ObservationsPage from './pages/ObservationsPage';
import CommunitiesPage from './pages/CommunitiesPage';
import EncyclopediaPage from './pages/EncyclopediaPage';
import AssistantPage from './pages/AssistantPage';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/garden" element={<GardenPage />} />
          <Route path="/observations" element={<ObservationsPage />} />
          <Route path="/communities" element={<CommunitiesPage />} />
          <Route path="/encyclopedia" element={<EncyclopediaPage />} />
          <Route path="/assistant" element={<AssistantPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
