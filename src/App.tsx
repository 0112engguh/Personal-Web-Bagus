import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HomePage } from '@/pages/HomePage';
import { GalleryPage } from '@/pages/GalleryPage';
import { AdminLoginPage } from '@/pages/admin/AdminLoginPage';
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

function AnimatedRoutes() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setExiting(true);
      const t = setTimeout(() => {
        setDisplayLocation(location);
        setExiting(false);
      }, 250);
      return () => clearTimeout(t);
    }
  }, [location, displayLocation]);

  return (
    <div
      style={{
        opacity: exiting ? 0 : 1,
        transform: exiting ? 'translateY(10px)' : 'translateY(0)',
        transition: exiting
          ? 'opacity 220ms ease-in, transform 220ms ease-in'
          : 'opacity 350ms ease-out, transform 350ms ease-out',
      }}
    >
      <Routes location={displayLocation}>
        <Route path="/" element={<HomePage />} />
        <Route path="/photography" element={<GalleryPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route 
          path="/admin/*" 
          element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>} 
        />
      </Routes>
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}

function App() {
  return <AnimatedRoutes />;
}

export default App;
