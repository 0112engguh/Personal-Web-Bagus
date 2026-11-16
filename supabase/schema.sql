-- ============================================
-- Personal Website — Supabase Schema
-- Run this in your Supabase SQL Editor
-- ============================================

-- 1. Personal Info (single row)
create table if not exists personal_info (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  location    text,
  title       text,
  subtitle    text,
  bio         text[] default '{}',
  email       text,
  cv_url      text,
  avatar_url  text,
  available_for_work boolean default false,
  created_at  timestamptz default now()
);

-- 2. Projects
create table if not exists projects (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  category    text,
  description text,
  tags        text[] default '{}',
  image_url   text,
  live_url    text,
  github_url  text,
  year        text,
  sort_order  int default 0,
  created_at  timestamptz default now()
);

-- 3. Experiences (work + education share one table)
create table if not exists experiences (
  id          uuid primary key default gen_random_uuid(),
  company     text not null,
  role        text,
  period      text,
  location    text,
  description text,
  type        text check (type in ('work', 'education')) not null,
  sort_order  int default 0,
  created_at  timestamptz default now()
);

-- 4. Certifications
create table if not exists certifications (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  issuer      text,
  date        text,
  url         text,
  sort_order  int default 0,
  created_at  timestamptz default now()
);

-- 5. Skills
create table if not exists skills (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  category    text,
  icon        text,
  sort_order  int default 0,
  created_at  timestamptz default now()
);

-- 6. Social Links
create table if not exists social_links (
  id          uuid primary key default gen_random_uuid(),
  label       text not null,
  handle      text,
  url         text,
  sort_order  int default 0,
  created_at  timestamptz default now()
);

-- 7. Photos
create table if not exists photos (
  id          uuid primary key default gen_random_uuid(),
  src         text not null,
  thumb       text,
  alt         text,
  category    text check (category in ('street', 'architecture', 'portrait', 'nature', 'abstract')),
  location    text,
  year        text,
  featured    boolean default false,
  sort_order  int default 0,
  created_at  timestamptz default now()
);

-- ============================================
-- Row Level Security (public read-only)
-- ============================================

alter table personal_info enable row level security;
alter table projects enable row level security;
alter table experiences enable row level security;
alter table certifications enable row level security;
alter table skills enable row level security;
alter table social_links enable row level security;
alter table photos enable row level security;

-- Allow anyone to read all tables
create policy "Public read personal_info" on personal_info for select using (true);
create policy "Public read projects" on projects for select using (true);
create policy "Public read experiences" on experiences for select using (true);
create policy "Public read certifications" on certifications for select using (true);
create policy "Public read skills" on skills for select using (true);
create policy "Public read social_links" on social_links for select using (true);
create policy "Public read photos" on photos for select using (true);

-- Allow the logged-in admin to write content
create policy "Auth write personal_info" on personal_info for all to authenticated using (true) with check (true);
create policy "Auth write projects" on projects for all to authenticated using (true) with check (true);
create policy "Auth write experiences" on experiences for all to authenticated using (true) with check (true);
create policy "Auth write certifications" on certifications for all to authenticated using (true) with check (true);
create policy "Auth write skills" on skills for all to authenticated using (true) with check (true);
create policy "Auth write social_links" on social_links for all to authenticated using (true) with check (true);
create policy "Auth write photos" on photos for all to authenticated using (true) with check (true);

-- ============================================
-- Storage: public bucket for local file uploads
-- (avatar, CV, photos, project images)
-- ============================================
insert into storage.buckets (id, name, public)
values ('uploads', 'uploads', true)
on conflict (id) do nothing;

create policy "Public read uploads" on storage.objects
  for select using (bucket_id = 'uploads');

create policy "Auth insert uploads" on storage.objects
  for insert to authenticated with check (bucket_id = 'uploads');

create policy "Auth update uploads" on storage.objects
  for update to authenticated using (bucket_id = 'uploads');

create policy "Auth delete uploads" on storage.objects
  for delete to authenticated using (bucket_id = 'uploads');
