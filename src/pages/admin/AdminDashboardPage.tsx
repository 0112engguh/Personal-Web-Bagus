import { AdminLayout } from '@/components/admin/AdminLayout';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ProjectsAdmin } from './ProjectsAdmin';
import { PhotosAdmin } from './PhotosAdmin';
import { LinksAdmin } from './LinksAdmin';
import { InfoAdmin } from './InfoAdmin';
import { ExperiencesAdmin } from './ExperiencesAdmin';

function AdminHome() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-display text-accent mb-2">Dashboard</h1>
        <p className="text-subtle text-sm font-mono">Select a module from the sidebar to manage your content.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { title: 'Projects', desc: 'Add or update your work portfolio', path: '/admin/projects' },
          { title: 'Photography', desc: 'Curate your street and architectural frames', path: '/admin/photos' },
          { title: 'Personal Info', desc: 'Sync your bio, location and status', path: '/admin/info' },
          { title: 'Experiences', desc: 'Manage your work and education history', path: '/admin/experiences' },
        ].map((item) => (
          <div key={item.title} className="p-6 rounded-2xl border border-border bg-surface hover:border-white/15 transition-all group cursor-pointer" onClick={() => navigate(item.path)}>
            <h3 className="text-lg font-medium text-accent mb-1 group-hover:text-highlight transition-colors">{item.title}</h3>
            <p className="text-xs text-muted font-mono mb-4">{item.desc}</p>
            <div className="text-[10px] text-muted/50 uppercase tracking-widest">Management Module</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminDashboardPage() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="/projects" element={<ProjectsAdmin />} />
        <Route path="/photos" element={<PhotosAdmin />} />
        <Route path="/info" element={<InfoAdmin />} />
        <Route path="/experiences" element={<ExperiencesAdmin />} />
        <Route path="/links" element={<LinksAdmin />} />
      </Routes>
    </AdminLayout>
  );
}
