-- ============================================
-- Seed Data — Run AFTER schema.sql
-- This inserts all current hardcoded content
-- ============================================

-- Personal Info
insert into personal_info (name, location, title, subtitle, bio, email, cv_url, avatar_url, available_for_work)
values (
  'Bagus Wicaksana',
  'Depok, Jawa Barat, Indonesia',
  'Junior Web Developer',
  'Informatics Student & Photography Enthusiast',
  ARRAY[
    'Informatics student building clean and functional web experiences. Passionate about turning ideas into well-crafted interfaces — from design systems to interactive UIs.',
    'Outside of code, I shoot with my camera — mostly street, architecture, and candid moments. Photography taught me how to frame things, and I bring that same eye to the web.'
  ],
  'baguswicaksana217@gmail.com',
  '/CV_Bagus_Wicaksana.pdf',
  '/ProfileUnformal.jpeg',
  true
);

-- Projects
insert into projects (title, category, description, tags, image_url, year, live_url, github_url, sort_order) values
  ('Pengaduan Masyarakat', 'Web App', 'A public complaint reporting system that enables citizens to submit, monitor, and manage complaints online.', ARRAY['React', 'Laravel', 'MySql', 'Tailwind'], '/pengaduan-porto.PNG', '2026', '#', 'https://github.com/0112engguh/New-PENMAS.git', 1),
  ('Job Application Tracker', 'Web App', 'A web application that helps users track and manage their job applications in one place.', ARRAY['Next.js', 'React', 'MongoDB', 'Tailwind'], '/job-app-dash.png', '2026', '#', 'https://github.com/0112engguh/Job-Application-Tracker.git', 2);

-- Experiences (work)
insert into experiences (company, role, period, location, description, type, sort_order) values
  ('IMP Studio', 'Web Dev Intern', 'August 2022 – Feb 23', 'Jakarta, ID', 'Membangun dan memaintain web app menggunakan Laravel', 'work', 1);

-- Experiences (education)
insert into experiences (company, role, period, location, description, type, sort_order) values
  ('Universitas Indraprasta PGRI', 'Teknik Informatika', '2023 – Present', 'Jakarta, ID', '', 'education', 1),
  ('SMK Taruna Bhakti', 'Rekayasa Perangkat Lunak', '2020 – 2023', 'Depok, ID', '', 'education', 2);

-- Certifications
insert into certifications (title, issuer, date, url, sort_order) values
  ('Databases - MySql', 'Certiport', 'May 2023', '/Certified-Databases-Bagus.pdf', 1);

-- Skills
insert into skills (name, category, sort_order) values
  ('React', 'Language', 1),
  ('Laravel', 'Language', 2),
  ('PHP', 'Language', 3),
  ('Tailwind CSS', 'Language', 4),
  ('JavaScript', 'Language', 5),
  ('HTML & CSS', 'Language', 6),
  ('Bootstrap', 'Language', 7),
  ('Git & GitHub', 'Tools', 8),
  ('VS Code', 'Tools', 9),
  ('Figma', 'Tools', 10),
  ('Claude AI', 'Tools', 11),
  ('MySql', 'Tools', 12);

-- Social Links
insert into social_links (label, handle, url, sort_order) values
  ('GitHub', '/0112engguh', 'https://github.com/0112engguh', 1),
  ('LinkedIn', '/in/bagus-wicaksana', 'https://www.linkedin.com/in/bagus-wicaksana/', 2),
  ('Instagram', '@engguuh', 'https://www.instagram.com/engguuh/', 3),
  ('E-mail', 'baguswicaksana217@gmail.com', 'mailto:baguswicaksana217@gmail.com', 4);

-- Photos
insert into photos (src, thumb, alt, category, location, year, featured, sort_order) values
  ('/photos/DSCF2425.JPG', '/photos/DSCF2425.JPG', 'Persimpangan dekat stasiun Sudirman', 'street', 'Jakarta', '2025', true, 1),
  ('/photos/flare.jpeg', '/photos/flare.jpeg', 'A boy celebrating a moment of victory', 'street', 'Depok', '2024', true, 2),
  ('/photos/arsip.jpeg', '/photos/arsip.jpeg', 'Prewedding - Formal Theme', 'portrait', 'Bogor', '2024', false, 3),
  ('/photos/042A1271.jpg', '/photos/042A1271.jpg', 'Prewedding - Blue Strip Theme', 'portrait', 'Bogor', '2024', false, 4),
  ('/photos/kak-ines.jpg', '/photos/kak-ines.jpg', 'Prewedding - Jersey Theme', 'portrait', 'Bogor', '2024', true, 5);
