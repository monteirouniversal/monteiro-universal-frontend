import { Routes, Route } from 'react-router-dom';
import PublicRoutes from './routes/PublicRoutes';
import AdminRoutes from './routes/AdminRoutes';
import Login from './pages/auth/Login';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'sonner';
import { HelmetProvider } from 'react-helmet-async';
import NotificationManager from './components/admin/NotificationManager';

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Toaster position="top-right" theme="dark" expand={true} richColors />
        <NotificationManager />
        <Routes>
          {/* Auth Route */}
          <Route path="/auth/login" element={<Login />} />

          {/* Admin Routes (Custom branded portal) */}
          <Route path="/portal-monteiro/*" element={<AdminRoutes />} />

          {/* Public Routes - Catch all other routes */}
          <Route path="/*" element={<PublicRoutes />} />
        </Routes>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;