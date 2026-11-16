import { supabase } from './supabase';

const BUCKET = 'uploads';

/** Upload a local file to the public bucket and return its URL. */
export async function uploadFile(file: File): Promise<string> {
  const ext = file.name.split('.').pop() || 'bin';
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file);
  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
