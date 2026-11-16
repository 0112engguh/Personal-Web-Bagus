import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Save, RefreshCw, Upload } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { uploadFile } from '@/lib/upload';
import { PhotoRow } from '@/hooks/useSupabase';

export function PhotosAdmin() {
  const [photos, setPhotos] = useState<PhotoRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<PhotoRow>>({});
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('photos')
      .select('*')
      .order('sort_order', { ascending: true });
    
    if (data) setPhotos(data);
    setLoading(false);
  };

  const handleEdit = (photo: PhotoRow) => {
    setEditingId(photo.id);
    setFormData(photo);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddNew = () => {
    setEditingId('new');
    setFormData({
      src: '',
      alt: '',
      category: 'street',
      location: '',
      year: new Date().getFullYear().toString(),
      featured: false,
      sort_order: photos.length + 1,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadFile(file);
      setFormData(prev => ({ ...prev, src: url, thumb: url }));
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
      const { error } = await supabase.from('photos').insert([formData]);
      if (error) alert(error.message);
    } else {
      const { error } = await supabase.from('photos').update(formData).eq('id', editingId);
      if (error) alert(error.message);
    }

    setEditingId(null);
    setFormData({});
    fetchPhotos();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this photo?')) return;
    
    setLoading(true);
    const { error } = await supabase.from('photos').delete().eq('id', id);
    if (error) alert(error.message);
    fetchPhotos();
  };

  if (loading && photos.length === 0) {
    return <div className="flex items-center justify-center p-20"><RefreshCw className="w-6 h-6 animate-spin text-muted" /></div>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display text-accent mb-1">Photography</h1>
          <p className="text-subtle text-xs sm:text-sm font-mono">Manage your gallery frames</p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center justify-center gap-2 bg-accent text-bg px-4 py-2.5 rounded-xl text-xs font-mono hover:bg-highlight transition-colors w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          Add New Photo
        </button>
      </div>

      {editingId && (
        <div className="mb-12 p-8 rounded-2xl border border-white/10 bg-white/[0.02] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-medium text-highlight">
              {editingId === 'new' ? 'Add New Frame' : 'Edit Frame'}
            </h2>
            <button onClick={() => setEditingId(null)} className="text-muted hover:text-accent transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-mono text-muted uppercase tracking-wider mb-2">Image URL (Source)</label>
              <input
                required
                value={formData.src || ''}
                onChange={e => setFormData({ ...formData, src: e.target.value })}
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:border-accent outline-none"
                placeholder="https://... or upload below"
              />
              <label className="mt-2 flex items-center justify-center gap-2 px-4 py-2 border border-dashed border-border rounded-xl text-[10px] font-mono text-muted cursor-pointer hover:border-accent hover:text-accent transition-all">
                <Upload className="w-3 h-3" />
                {uploading ? 'Uploading...' : 'Upload from Local (thumbnail generated automatically)'}
                <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} disabled={uploading} />
              </label>
            </div>
            <div>
              <label className="block text-[10px] font-mono text-muted uppercase tracking-wider mb-2">Alt Text</label>
              <input
                required
                value={formData.alt || ''}
                onChange={e => setFormData({ ...formData, alt: e.target.value })}
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:border-accent outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-muted uppercase tracking-wider mb-2">Category</label>
              <select
                value={formData.category || 'street'}
                onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:border-accent outline-none appearance-none"
              >
                <option value="street">Street</option>
                <option value="architecture">Architecture</option>
                <option value="nature">Nature</option>
                <option value="portrait">Portrait</option>
                <option value="abstract">Abstract</option>
              </select>
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
              <label className="block text-[10px] font-mono text-muted uppercase tracking-wider mb-2">Year</label>
              <input
                value={formData.year || ''}
                onChange={e => setFormData({ ...formData, year: e.target.value })}
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
            <div className="flex items-center gap-3 pt-6">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured || false}
                onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 accent-accent rounded"
              />
              <label htmlFor="featured" className="text-xs font-mono text-accent">Feature on Homepage</label>
            </div>

            <div className="sm:col-span-2 pt-4 flex gap-3">
              <button
                type="submit"
                className="flex items-center gap-2 bg-highlight text-bg px-6 py-3 rounded-xl text-xs font-mono hover:brightness-110 transition-all"
              >
                <Save className="w-4 h-4" />
                {editingId === 'new' ? 'Add Photo' : 'Save Changes'}
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

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {photos.length === 0 ? (
          <div className="col-span-full text-center py-10 border border-dashed border-border rounded-2xl text-muted font-mono text-xs">
            No photos found. Add your first frame above.
          </div>
        ) : (
          photos.map((photo) => (
            <div key={photo.id} className="relative aspect-square rounded-xl overflow-hidden border border-border bg-surface group">
              <img 
                src={photo.thumb || photo.src} 
                alt={photo.alt}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-bg/90 to-transparent">
                <p className="text-[10px] font-mono text-accent truncate">{photo.alt}</p>
                <p className="text-[9px] font-mono text-muted uppercase tracking-wider">{photo.category}</p>
              </div>
              
              {photo.featured && (
                <div className="absolute top-2 left-2 bg-accent text-bg p-1 rounded-md">
                  <Plus className="w-2.5 h-2.5" />
                </div>
              )}

              <div className="absolute top-2 right-2 flex flex-col gap-1 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handleEdit(photo)}
                  className="p-1.5 rounded-lg bg-bg/80 backdrop-blur-md text-muted hover:text-highlight transition-colors border border-white/5"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => handleDelete(photo.id)}
                  className="p-1.5 rounded-lg bg-bg/80 backdrop-blur-md text-muted hover:text-red-400 transition-colors border border-white/5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
