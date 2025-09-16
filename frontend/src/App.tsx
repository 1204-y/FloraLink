import type { ReactNode } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import GardenPage from './pages/GardenPage';
import ObservationsPage from './pages/ObservationsPage';
import CommunitiesPage from './pages/CommunitiesPage';
import EncyclopediaPage from './pages/EncyclopediaPage';
import AssistantPage from './pages/AssistantPage';

const PageTransition = ({ children }: { children: ReactNode }) => (
  <motion.div
    className="page"
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.35, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<PageTransition><DashboardPage /></PageTransition>} />
        <Route path="/garden" element={<PageTransition><GardenPage /></PageTransition>} />
        <Route path="/observations" element={<PageTransition><ObservationsPage /></PageTransition>} />
        <Route path="/communities" element={<PageTransition><CommunitiesPage /></PageTransition>} />
        <Route path="/encyclopedia" element={<PageTransition><EncyclopediaPage /></PageTransition>} />
        <Route path="/assistant" element={<PageTransition><AssistantPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </BrowserRouter>
  );
};

export default App;
