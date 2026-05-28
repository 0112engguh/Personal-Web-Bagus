import { useState, useEffect } from 'react';
import { Plus, Trash2, RefreshCw, Link as LinkIcon, Code } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { SkillRow, SocialLinkRow } from '@/hooks/useSupabase';

export function LinksAdmin() {
  const [skills, setSkills] = useState<SkillRow[]>([]);
  const [links, setLinks] = useState<SocialLinkRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [s, l] = await Promise.all([
      supabase.from('skills').select('*').order('sort_order', { ascending: true }),
      supabase.from('social_links').select('*').order('sort_order', { ascending: true })
    ]);
    if (s.data) setSkills(s.data);
    if (l.data) setLinks(l.data);
    setLoading(false);
  };

  const handleAddSkill = async () => {
    const name = prompt('Skill name:');
    if (!name) return;
    const { error } = await supabase.from('skills').insert([{ name, category: 'Tech', sort_order: skills.length + 1 }]);
    if (error) alert(error.message);
    fetchData();
  };

  const handleAddLink = async () => {
    const label = prompt('Link label (e.g. GitHub):');
    const url = prompt('URL:');
    if (!label || !url) return;
    const { error } = await supabase.from('social_links').insert([{ label, url, sort_order: links.length + 1 }]);
    if (error) alert(error.message);
    fetchData();
  };

  const handleDelete = async (table: 'skills' | 'social_links', id: string) => {
    if (!confirm('Delete this item?')) return;
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) alert(error.message);
    fetchData();
  };

  if (loading) return <div className="flex items-center justify-center p-20"><RefreshCw className="w-6 h-6 animate-spin text-muted" /></div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-highlight" />
            <h2 className="text-xl font-display text-accent">Skills</h2>
          </div>
          <button onClick={handleAddSkill} className="p-2 rounded-lg bg-surface border border-border text-muted hover:text-accent transition-all">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-2">
          {skills.map(skill => (
            <div key={skill.id} className="flex items-center justify-between p-3 rounded-xl border border-border bg-surface/30 group">
              <span className="text-xs font-mono text-accent">{skill.name}</span>
              <button onClick={() => handleDelete('skills', skill.id)} className="opacity-0 group-hover:opacity-100 text-muted hover:text-red-400 transition-all">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-highlight" />
            <h2 className="text-xl font-display text-accent">Social Links</h2>
          </div>
          <button onClick={handleAddLink} className="p-2 rounded-lg bg-surface border border-border text-muted hover:text-accent transition-all">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-2">
          {links.map(link => (
            <div key={link.id} className="flex items-center justify-between p-3 rounded-xl border border-border bg-surface/30 group">
              <div className="flex flex-col">
                <span className="text-xs font-mono text-accent">{link.label}</span>
                <span className="text-[10px] font-mono text-muted truncate max-w-[150px]">{link.url}</span>
              </div>
              <button onClick={() => handleDelete('social_links', link.id)} className="opacity-0 group-hover:opacity-100 text-muted hover:text-red-400 transition-all">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
