import { ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Camera, 
  User, 
  LogOut, 
  ExternalLink,
  Award,
  Link as LinkIcon
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: ReactNode;
}

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { label: 'Personal Info', icon: User, path: '/admin/info' },
  { label: 'Projects', icon: Briefcase, path: '/admin/projects' },
  { label: 'Photography', icon: Camera, path: '/admin/photos' },
  { label: 'Experiences', icon: Award, path: '/admin/experiences' },
  { label: 'Social & Skills', icon: LinkIcon, path: '/admin/links' },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-bg text-accent">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border p-6 flex flex-col fixed h-full bg-bg z-20">
        <div className="mb-10">
          <h2 className="text-xl font-display text-accent tracking-tight">Admin Console</h2>
          <p className="text-[10px] font-mono text-muted uppercase tracking-widest mt-1">Personal Web Management</p>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-mono transition-all duration-200",
                isActive 
                  ? "bg-accent text-bg" 
                  : "text-muted hover:text-accent hover:bg-white/[0.03]"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto space-y-1 pt-6 border-t border-border">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-mono text-muted hover:text-accent hover:bg-white/[0.03] transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            View Site
          </a>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-mono text-muted hover:text-red-400 hover:bg-red-400/5 transition-all text-left"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-10 min-h-screen relative">
        <div 
          className="fixed inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: '150px 150px',
          }}
        />
        <div className="relative z-10 max-w-4xl">
          {children}
        </div>
      </main>
    </div>
  );
}
