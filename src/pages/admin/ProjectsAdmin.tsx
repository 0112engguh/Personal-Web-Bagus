import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Save, RefreshCw, Upload } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { uploadFile } from '@/lib/upload';
import { ProjectRow } from '@/hooks/useSupabase';

export function ProjectsAdmin() {
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<ProjectRow>>({});
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true });
    
    if (data) setProjects(data);
    setLoading(false);
  };

  const handleEdit = (project: ProjectRow) => {
    setEditingId(project.id);
    setFormData(project);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddNew = () => {
    setEditingId('new');
    setFormData({
      title: '',
      category: '',
      description: '',
      tags: [],
      year: new Date().getFullYear().toString(),
      sort_order: projects.length + 1,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadFile(file);
      setFormData(prev => ({ ...prev, image_url: url }));
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (editingId === 'new') {
      const { error } = await supabase.from('projects').insert([formData]);
      if (error) alert(error.message);
    } else {
      const { error } = await supabase.from('projects').update(formData).eq('id', editingId);
      if (error) alert(error.message);
    }

    setEditingId(null);
    setFormData({});
    fetchProjects();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    setLoading(true);
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) alert(error.message);
    fetchProjects();
  };

  if (loading && projects.length === 0) {
    return <div className="flex items-center justify-center p-20"><RefreshCw className="w-6 h-6 animate-spin text-muted" /></div>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display text-accent mb-1">Projects</h1>
          <p className="text-subtle text-xs sm:text-sm font-mono">Manage your portfolio works</p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center justify-center gap-2 bg-accent text-bg px-4 py-2.5 rounded-xl text-xs font-mono hover:bg-highlight transition-colors w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          Add New Project
        </button>
      </div>

      {editingId && (
        <div className="mb-12 p-8 rounded-2xl border border-white/10 bg-white/[0.02] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-medium text-highlight">
              {editingId === 'new' ? 'Create New Project' : 'Edit Project'}
            </h2>
            <button onClick={() => setEditingId(null)} className="text-muted hover:text-accent transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-mono text-muted uppercase tracking-wider mb-2">Title</label>
              <input
                required
                value={formData.title || ''}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:border-accent outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-muted uppercase tracking-wider mb-2">Category</label>
              <input
                value={formData.category || ''}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:border-accent outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-muted uppercase tracking-wider mb-2">Year</label>
              <input
                value={formData.year || ''}
                onChange={e => setFormData({ ...formData, year: e.target.value })}
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:border-accent outline-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-mono text-muted uppercase tracking-wider mb-2">Description</label>
              <textarea
                rows={4}
                value={formData.description || ''}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:border-accent outline-none resize-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-muted uppercase tracking-wider mb-2">Image URL</label>
              <input
                value={formData.image_url || ''}
                onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:border-accent outline-none"
                placeholder="https://... or upload below"
              />
              <label className="mt-2 flex items-center justify-center gap-2 px-4 py-2 border border-dashed border-border rounded-xl text-[10px] font-mono text-muted cursor-pointer hover:border-accent hover:text-accent transition-all">
                <Upload className="w-3 h-3" />
                {uploading ? 'Uploading...' : 'Upload Image from Local'}
                <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} disabled={uploading} />
              </label>
            </div>
            <div>
              <label className="block text-[10px] font-mono text-muted uppercase tracking-wider mb-2">GitHub URL</label>
              <input
                value={formData.github_url || ''}
                onChange={e => setFormData({ ...formData, github_url: e.target.value })}
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:border-accent outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-muted uppercase tracking-wider mb-2">Live URL</label>
              <input
                value={formData.live_url || ''}
                onChange={e => setFormData({ ...formData, live_url: e.target.value })}
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:border-accent outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-muted uppercase tracking-wider mb-2">Sort Order</label>
              <input
                type="number"
                value={formData.sort_order || 0}
                onChange={e => setFormData({ ...formData, sort_order: parseInt(e.target.value) })}
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:border-accent outline-none"
              />
            </div>
            <div className="sm:col-span-2">
               <label className="block text-[10px] font-mono text-muted uppercase tracking-wider mb-2">Tags (comma separated)</label>
               <input
                value={formData.tags?.join(', ') || ''}
                onChange={e => setFormData({ ...formData, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })}
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:border-accent outline-none"
              />
            </div>

            <div className="sm:col-span-2 pt-4 flex gap-3">
              <button
                type="submit"
                className="flex items-center gap-2 bg-highlight text-bg px-6 py-3 rounded-xl text-xs font-mono hover:brightness-110 transition-all"
              >
                <Save className="w-4 h-4" />
                {editingId === 'new' ? 'Create Project' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => setEditingId(null)}
                className="px-6 py-3 rounded-xl text-xs font-mono border border-border text-muted hover:text-accent hover:border-white/15 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-3">
        {projects.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-border rounded-2xl text-muted font-mono text-xs">
            No projects found. Add your first one above.
          </div>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="flex items-center justify-between p-4 rounded-xl border border-border bg-surface group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/[0.03] flex items-center justify-center text-[10px] font-mono text-muted border border-white/5">
                  {project.sort_order}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-accent">{project.title}</h3>
                  <p className="text-[10px] font-mono text-muted uppercase tracking-wider">{project.category} · {project.year}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handleEdit(project)}
                  className="p-2 rounded-lg hover:bg-white/5 text-muted hover:text-highlight transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(project.id)}
                  className="p-2 rounded-lg hover:bg-red-400/5 text-muted hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
