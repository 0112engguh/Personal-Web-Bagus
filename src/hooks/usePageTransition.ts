import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function usePageTransition() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [stage, setStage] = useState<'enter' | 'exit' | 'idle'>('idle');

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setStage('exit');
      const t = setTimeout(() => {
        setDisplayLocation(location);
        setStage('enter');
      }, 280);
      return () => clearTimeout(t);
    }
  }, [location, displayLocation]);

  useEffect(() => {
    if (stage === 'enter') {
      const t = setTimeout(() => setStage('idle'), 400);
      return () => clearTimeout(t);
    }
  }, [stage]);

  return { displayLocation, stage };
}
