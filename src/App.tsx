import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HomePage } from '@/pages/HomePage';
import { GalleryPage } from '@/pages/GalleryPage';

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
      </Routes>
    </div>
  );
}

function App() {
  return <AnimatedRoutes />;
}

export default App;
