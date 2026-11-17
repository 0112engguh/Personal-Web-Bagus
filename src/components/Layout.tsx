import { useEffect, useState, type ReactNode } from 'react';
import { Moon, Sun } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [light, setLight] = useState(() => {
    try {
      return localStorage.getItem('theme') === 'light';
    } catch {
      return false;
    }
  });

  const applyTheme = (isLight: boolean) => {
    const root = document.documentElement;
    root.classList.toggle('light', isLight);
    root.setAttribute('data-theme', isLight ? 'light' : 'dark');
    root.style.colorScheme = isLight ? 'light' : 'dark';
  };

  useEffect(() => {
    applyTheme(light);
    try {
      localStorage.setItem('theme', light ? 'light' : 'dark');
    } catch {
      // storage disabled
    }
  }, [light]);

  return (
    <div className="min-h-screen bg-bg text-accent">
      <nav className="sticky top-0 z-40 border-b border-border/60 bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex h-12 max-w-4xl items-center justify-between px-5 sm:px-8">
          <a href="#home" className="font-mono text-sm font-semibold tracking-tight hover:text-highlight transition-colors">
            BW
          </a>
          <div className="flex items-center gap-3 font-mono text-[11px] text-muted sm:gap-4">
            <a href="#about" className="hover:text-accent transition-colors">About</a>
            <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
            <a href="#work" className="hover:text-accent transition-colors">Work</a>
            <a href="#photos" className="hover:text-accent transition-colors">Photos</a>
            <button
              type="button"
              onClick={() => {
                const next = !light;
                setLight(next);
                applyTheme(next);
              }}
              aria-label={light ? 'Switch to dark mode' : 'Switch to light mode'}
              className="rounded-lg p-1.5 text-muted transition-colors hover:bg-accent/5 hover:text-accent"
            >
              {light ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </nav>

      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(var(--color-highlight) / 0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(var(--color-highlight) / 0.06) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      <main className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8">
        {children}
      </main>
    </div>
  );
}
