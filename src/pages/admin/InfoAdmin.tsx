import { useState, useEffect } from 'react';
import { Save, RefreshCw, User, MapPin, Type, Mail, FileText, CheckCircle2, Upload } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { uploadFile } from '@/lib/upload';
import { PersonalInfoRow } from '@/hooks/useSupabase';
import { cn } from '@/lib/utils';

export function InfoAdmin() {
  const [data, setData] = useState<Partial<PersonalInfoRow>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    setLoading(true);
    const { data: result } = await supabase
      .from('personal_info')
      .select('*')
      .single();
    
    if (result) setData(result);
    setLoading(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'avatar_url' | 'cv_url') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(field);
    try {
      const url = await uploadFile(file);
      setData(prev => ({ ...prev, [field]: url }));
      setMessage({ type: 'success', text: `${field === 'avatar_url' ? 'Avatar' : 'CV'} uploaded! Remember to save changes.` });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: (err as Error).message });
    } finally {
      setUploading(null);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // Create a copy of data without id for update
    const { id, ...updateData } = data;
    
    if (!id) {
      setMessage({ type: 'error', text: 'Error: No record ID found. Try refreshing.' });
      setSaving(false);
      return;
    }

    const { error } = await supabase
      .from('personal_info')
      .update(updateData)
      .eq('id', id);

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'Personal info updated successfully!' });
      // Re-fetch to ensure we have the latest data
      fetchInfo();
      setTimeout(() => setMessage(null), 3000);
    }
    setSaving(false);
  };

  if (loading) {
    return <div className="flex items-center justify-center p-20"><RefreshCw className="w-6 h-6 animate-spin text-muted" /></div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-display text-accent mb-1">Personal Info</h1>
        <p className="text-subtle text-xs sm:text-sm font-mono">Manage your public identity</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-8 rounded-2xl border border-white/5 bg-white/[0.01]">
          <div className="sm:col-span-2 flex items-center gap-3 mb-2">
            <User className="w-4 h-4 text-highlight" />
            <h2 className="text-sm font-mono text-accent uppercase tracking-widest">Base Identity</h2>
          </div>
          
          <div className="sm:col-span-1">
            <label className="block text-[10px] font-mono text-muted uppercase tracking-wider mb-2">Full Name</label>
            <input
              required
              value={data.name || ''}
              onChange={e => setData({ ...data, name: e.target.value })}
              className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:border-accent outline-none"
            />
          </div>

          <div className="sm:col-span-1">
            <label className="block text-[10px] font-mono text-muted uppercase tracking-wider mb-2">Location</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-3.5 w-4 h-4 text-muted/40" />
              <input
                value={data.location || ''}
                onChange={e => setData({ ...data, location: e.target.value })}
                className="w-full bg-surface border border-border rounded-xl pl-11 pr-4 py-3 text-sm focus:border-accent outline-none"
              />
            </div>
          </div>

          <div className="sm:col-span-1">
            <label className="block text-[10px] font-mono text-muted uppercase tracking-wider mb-2">Main Title</label>
            <div className="relative">
              <Type className="absolute left-4 top-3.5 w-4 h-4 text-muted/40" />
              <input
                value={data.title || ''}
                onChange={e => setData({ ...data, title: e.target.value })}
                className="w-full bg-surface border border-border rounded-xl pl-11 pr-4 py-3 text-sm focus:border-accent outline-none"
                placeholder="e.g. Senior Frontend Developer"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[10px] font-mono text-muted uppercase tracking-wider mb-2">Subtitle / Slogan</label>
            <input
              value={data.subtitle || ''}
              onChange={e => setData({ ...data, subtitle: e.target.value })}
              className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:border-accent outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[10px] font-mono text-muted uppercase tracking-wider mb-2">Bio paragraphs (one per line)</label>
            <textarea
              rows={5}
              value={data.bio?.join('\n') || ''}
              onChange={e => setData({ ...data, bio: e.target.value.split('\n').filter(Boolean) })}
              className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:border-accent outline-none resize-none leading-relaxed"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-8 rounded-2xl border border-white/5 bg-white/[0.01]">
          <div className="sm:col-span-2 flex items-center gap-3 mb-2">
            <Mail className="w-4 h-4 text-highlight" />
            <h2 className="text-sm font-mono text-accent uppercase tracking-widest">Contact & Assets</h2>
          </div>

          <div>
            <label className="block text-[10px] font-mono text-muted uppercase tracking-wider mb-2">Email Address</label>
            <input
              type="email"
              value={data.email || ''}
              onChange={e => setData({ ...data, email: e.target.value })}
              className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:border-accent outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono text-muted uppercase tracking-wider mb-2">Avatar</label>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              {data.avatar_url && (
                <img src={data.avatar_url} alt="Avatar Preview" className="w-12 h-12 rounded-full object-cover border border-border shrink-0" />
              )}
              <div className="w-full">
                <input
                  type="text"
                  value={data.avatar_url || ''}
                  onChange={e => setData({ ...data, avatar_url: e.target.value })}
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-xs focus:border-accent outline-none mb-2"
                  placeholder="URL or Upload below"
                />
                <label className="flex items-center justify-center gap-2 px-4 py-2 border border-dashed border-border rounded-xl text-[10px] font-mono text-muted cursor-pointer hover:border-accent hover:text-accent transition-all">
                  <Upload className="w-3 h-3" />
                  {uploading === 'avatar_url' ? 'Uploading...' : 'Upload from Local'}
                  <input type="file" className="hidden" accept="image/*" onChange={e => handleFileUpload(e, 'avatar_url')} disabled={!!uploading} />
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono text-muted uppercase tracking-wider mb-2">CV / Resume</label>
            <div className="flex-1">
              <div className="relative mb-2">
                <FileText className="absolute left-4 top-3.5 w-4 h-4 text-muted/40" />
                <input
                  value={data.cv_url || ''}
                  onChange={e => setData({ ...data, cv_url: e.target.value })}
                  className="w-full bg-surface border border-border rounded-xl pl-11 pr-4 py-3 text-xs focus:border-accent outline-none"
                  placeholder="URL or Upload below"
                />
              </div>
              <label className="flex items-center justify-center gap-2 px-4 py-2 border border-dashed border-border rounded-xl text-[10px] font-mono text-muted cursor-pointer hover:border-accent hover:text-accent transition-all">
                <Upload className="w-3 h-3" />
                {uploading === 'cv_url' ? 'Uploading...' : 'Upload from Local'}
                <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={e => handleFileUpload(e, 'cv_url')} disabled={!!uploading} />
              </label>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-6">
            <input
              type="checkbox"
              id="work"
              checked={data.available_for_work || false}
              onChange={e => setData({ ...data, available_for_work: e.target.checked })}
              className="w-4 h-4 accent-accent rounded"
            />
            <label htmlFor="work" className="text-xs font-mono text-accent">Available for work</label>
          </div>
        </div>

        {message && (
          <div className={cn(
            "p-4 rounded-xl border flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2",
            message.type === 'success' ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-red-500/10 border-red-500/20 text-red-400"
          )}>
            {message.type === 'success' && <CheckCircle2 className="w-4 h-4" />}
            <span className="text-xs font-mono">{message.text}</span>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-accent text-bg px-8 py-3 rounded-xl text-xs font-mono hover:bg-highlight transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Update Personal Info'}
          </button>
        </div>
      </form>
    </div>
  );
}
