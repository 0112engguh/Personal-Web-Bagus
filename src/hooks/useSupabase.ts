import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

// ─── Generic hook ────────────────────────────────────────────
interface UseSupabaseOptions {
  column?: string;
  ascending?: boolean;
  filter?: { column: string; value: string | boolean };
  single?: boolean;
}

function useSupabaseQuery<T>(
  table: string,
  options?: UseSupabaseOptions
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetch() {
      setLoading(true);
      let query: any = supabase.from(table).select('*');

      if (options?.filter) {
        query = query.eq(options.filter.column, options.filter.value);
      }
      if (options?.column) {
        query = query.order(options.column, {
          ascending: options.ascending ?? true,
        });
      }
      if (options?.single) {
        query = query.limit(1).single();
      }

      const { data: result, error: err } = await query;

      if (cancelled) return;

      if (err) {
        setError(err.message);
        setData(null);
      } else {
        setData(result as T);
        setError(null);
      }
      setLoading(false);
    }

    fetch();
    return () => {
      cancelled = true;
    };
  }, [table, options?.filter?.value]);

  return { data, loading, error };
}

// ─── Typed interfaces (matching Supabase columns) ────────────
export interface PersonalInfoRow {
  id: string;
  name: string;
  location: string;
  title: string;
  subtitle: string;
  bio: string[];
  email: string;
  cv_url: string;
  avatar_url: string;
  available_for_work: boolean;
}

export interface ProjectRow {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image_url: string | null;
  live_url: string | null;
  github_url: string | null;
  year: string;
  sort_order: number;
}

export interface ExperienceRow {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  type: 'work' | 'education';
  sort_order: number;
}

export interface CertificationRow {
  id: string;
  title: string;
  issuer: string;
  date: string;
  url: string | null;
  sort_order: number;
}

export interface SkillRow {
  id: string;
  name: string;
  category: string;
  icon: string | null;
  sort_order: number;
}

export interface SocialLinkRow {
  id: string;
  label: string;
  handle: string;
  url: string;
  sort_order: number;
}

export interface PhotoRow {
  id: string;
  src: string;
  thumb: string | null;
  alt: string;
  category: 'street' | 'architecture' | 'portrait' | 'nature' | 'abstract';
  location: string | null;
  year: string;
  featured: boolean;
  sort_order: number;
}

// ─── Specialized hooks ──────────────────────────────────────

export function usePersonalInfo() {
  return useSupabaseQuery<PersonalInfoRow>('personal_info', { single: true });
}

export function useProjects() {
  return useSupabaseQuery<ProjectRow[]>('projects', {
    column: 'sort_order',
    ascending: true,
  });
}

export function useExperiences(type: 'work' | 'education') {
  return useSupabaseQuery<ExperienceRow[]>('experiences', {
    column: 'sort_order',
    ascending: true,
    filter: { column: 'type', value: type },
  });
}

export function useCertifications() {
  return useSupabaseQuery<CertificationRow[]>('certifications', {
    column: 'sort_order',
    ascending: true,
  });
}

export function useSkills() {
  return useSupabaseQuery<SkillRow[]>('skills', {
    column: 'sort_order',
    ascending: true,
  });
}

export function useSocialLinks() {
  return useSupabaseQuery<SocialLinkRow[]>('social_links', {
    column: 'sort_order',
    ascending: true,
  });
}

export function usePhotos() {
  return useSupabaseQuery<PhotoRow[]>('photos', {
    column: 'sort_order',
    ascending: true,
  });
}

export function useFeaturedPhotos() {
  return useSupabaseQuery<PhotoRow[]>('photos', {
    column: 'sort_order',
    ascending: true,
    filter: { column: 'featured', value: true },
  });
}
