import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Save, RefreshCw, Briefcase, GraduationCap } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { ExperienceRow } from '@/hooks/useSupabase';

export function ExperiencesAdmin() {
  const [experiences, setExperiences] = useState<ExperienceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<ExperienceRow>>({});

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('experiences')
      .select('*')
      .order('sort_order', { ascending: true });
    
    if (data) setExperiences(data);
    setLoading(false);
  };

  const handleEdit = (exp: ExperienceRow) => {
    setEditingId(exp.id);
    setFormData(exp);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddNew = () => {
    setEditingId('new');
    setFormData({
      company: '',
      role: '',
      period: '',
      location: '',
      description: '',
      type: 'work',
      sort_order: experiences.length + 1,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (editingId === 'new') {
      const { error } = await supabase.from('experiences').insert([formData]);
      if (error) alert(error.message);
    } else {
      const { error } = await supabase.from('experiences').update(formData).eq('id', editingId);
      if (error) alert(error.message);
    }

    setEditingId(null);
    setFormData({});
    fetchExperiences();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    setLoading(true);
    const { error } = await supabase.from('experiences').delete().eq('id', id);
    if (error) alert(error.message);
    fetchExperiences();
  };

  if (loading && experiences.length === 0) {
    return <div className="flex items-center justify-center p-20"><RefreshCw className="w-6 h-6 animate-spin text-muted" /></div>;
  }

  const workExps = experiences.filter(e => e.type === 'work');
  const eduExps = experiences.filter(e => e.type === 'education');

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display text-accent mb-1">Experiences</h1>
          <p className="text-subtle text-xs sm:text-sm font-mono">Work history and education</p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center justify-center gap-2 bg-accent text-bg px-4 py-2.5 rounded-xl text-xs font-mono hover:bg-highlight transition-colors w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </button>
      </div>

      {editingId && (
        <div className="mb-12 p-8 rounded-2xl border border-white/10 bg-white/[0.02] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-medium text-highlight">
              {editingId === 'new' ? 'New Experience' : 'Edit Experience'}
            </h2>
            <button onClick={() => setEditingId(null)} className="text-muted hover:text-accent transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-mono text-muted uppercase tracking-wider mb-2">Type</label>
              <select
                value={formData.type || 'work'}
                onChange={e => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:border-accent outline-none appearance-none"
              >
                <option value="work">Professional Experience</option>
                <option value="education">Education</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-mono text-muted uppercase tracking-wider mb-2">Company / School</label>
              <input
                required
                value={formData.company || ''}
                onChange={e => setFormData({ ...formData, company: e.target.value })}
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:border-accent outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-muted uppercase tracking-wider mb-2">Role / Degree</label>
              <input
                value={formData.role || ''}
                onChange={e => setFormData({ ...formData, role: e.target.value })}
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:border-accent outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-muted uppercase tracking-wider mb-2">Period</label>
              <input
                placeholder="e.g. 2022 - Present"
                value={formData.period || ''}
                onChange={e => setFormData({ ...formData, period: e.target.value })}
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:border-accent outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-muted uppercase tracking-wider mb-2">Location</label>
              <input
                value={formData.location || ''}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
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
              <label className="block text-[10px] font-mono text-muted uppercase tracking-wider mb-2">Description</label>
              <textarea
                rows={3}
                value={formData.description || ''}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:border-accent outline-none resize-none"
              />
            </div>

            <div className="sm:col-span-2 pt-4 flex gap-3">
              <button
                type="submit"
                className="flex items-center gap-2 bg-highlight text-bg px-6 py-3 rounded-xl text-xs font-mono hover:brightness-110 transition-all"
              >
                <Save className="w-4 h-4" />
                {editingId === 'new' ? 'Add Experience' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-12">
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="w-4 h-4 text-highlight" />
            <h2 className="text-sm font-mono text-accent uppercase tracking-widest text-muted/60">Work</h2>
          </div>
          <div className="space-y-3">
            {workExps.map(exp => (
              <ExperienceItem key={exp.id} exp={exp} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="w-4 h-4 text-highlight" />
            <h2 className="text-sm font-mono text-accent uppercase tracking-widest text-muted/60">Education</h2>
          </div>
          <div className="space-y-3">
            {eduExps.map(exp => (
              <ExperienceItem key={exp.id} exp={exp} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function ExperienceItem({ exp, onEdit, onDelete }: { exp: ExperienceRow, onEdit: (e: ExperienceRow) => void, onDelete: (id: string) => void }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-surface group">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-lg bg-white/[0.03] flex items-center justify-center text-[10px] font-mono text-muted border border-white/5">
          {exp.sort_order}
        </div>
        <div>
          <h3 className="text-sm font-medium text-accent">{exp.company}</h3>
          <p className="text-[10px] font-mono text-muted uppercase tracking-wider">{exp.role} · {exp.period}</p>
        </div>
      </div>
      <div className="flex items-center gap-1 sm:gap-2 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
        <button 
          onClick={() => onEdit(exp)}
          className="p-2 rounded-lg hover:bg-white/5 text-muted hover:text-highlight transition-colors"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button 
          onClick={() => onDelete(exp.id)}
          className="p-2 rounded-lg hover:bg-red-400/5 text-muted hover:text-red-400 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
