import type { Project, Experience, Skill, SocialLink, Certification } from '@/types';

export const personalInfo = {
  name: 'Bagus Wicaksana',
  location: 'Depok, Jawa Barat, Indonesia',
  title: 'Junior Web Developer',
  subtitle: 'Informatics Student & Photography Enthusiast',
  bio: [
    'Informatics student building clean and functional web experiences. Passionate about turning ideas into well-crafted interfaces — from design systems to interactive UIs.',
    'Outside of code, I shoot with my camera — mostly street, architecture, and candid moments. Photography taught me how to frame things, and I bring that same eye to the web.',
  ],
  email: 'baguswicaksana217@gmail.com',
  cvUrl: '/CV_Bagus_Wicaksana.pdf',
  availableForWork: true,
};

export const projects: Project[] = [
  {
    id: '1',
    title: 'Pengaduan Masyarakat',
    category: 'Web App',
    description: 'A public complaint reporting system that enables citizens to submit, monitor, and manage complaints online.',
    tags: ['React', 'Laravel', 'MySql', 'Tailwind'],
    imageUrl: '/pengaduan-porto.PNG',
    year: '2026',
    liveUrl: '#',
    githubUrl: 'https://github.com/0112engguh/New-PENMAS.git',
  },
  {
    id: '2',
    title: 'Job Application Tracker',
    category: 'Web App',
    description: 'A web application that helps users track and manage their job applications in one place.',
    tags: ['Next.js', 'React', 'MongoDB', 'Tailwind'],
    year: '2026',
    imageUrl: '/job-app-dash.png',
    liveUrl: '#',
    githubUrl: 'https://github.com/0112engguh/Job-Application-Tracker.git',
  },
];

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    company: 'IMP Studio',
    role: 'Web Dev Intern',
    period: 'August 2022 – Feb 23',
    location: 'Jakarta, ID',
    type: 'work',
    description: 'Membangun dan memaintain web app menggunakan Laravel',
  },
];

export const education: Experience[] = [
  {
    id: 'edu-1',
    company: 'Universitas Indraprasta PGRI',
    role: 'Teknik Informatika',
    period: '2023 – Present',
    location: 'Jakarta, ID',
    type: 'education',
    description: '',
  },
  {
    id: 'edu-2',
    company: 'SMK Taruna Bhakti',
    role: 'Rekayasa Perangkat Lunak',
    period: '2020 – 2023',
    location: 'Depok, ID',
    type: 'education',
    description: '',
  },
];

export const certifications: Certification[] = [
  {
    id: 'cert-1',
    title: 'React - The Complete Guide',
    issuer: 'Udemy',
    date: 'Mar 2024',
    url: '#',
  },
  {
    id: 'cert-2',
    title: 'JavaScript Algorithms & Data Structures',
    issuer: 'freeCodeCamp',
    date: 'Nov 2023',
    url: '#',
  },
  {
    id: 'cert-3',
    title: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    date: 'Aug 2023',
    url: '#',
  },
];

export const skills: Skill[] = [
  { id: 's1', name: 'React', category: 'Language' },
  { id: 's2', name: 'Laravel', category: 'Language' },
  { id: 's3', name: 'PHP', category: 'Language' },
  { id: 's4', name: 'Tailwind CSS', category: 'Language' },
  { id: 's5', name: 'JavaScript', category: 'Language' },
  { id: 's6', name: 'HTML & CSS', category: 'Language' },
  { id: 's12', name: 'Bootstrap', category: 'Language' },

  { id: 's7', name: 'Git & GitHub', category: 'Tools' },
  { id: 's8', name: 'VS Code', category: 'Tools' },
  { id: 's9', name: 'Figma', category: 'Tools' },
  { id: 's10', name: 'Claude AI', category: 'Tools' },
  { id: 's11', name: 'MySql', category: 'Tools' },
];

export const socialLinks: SocialLink[] = [
  {
    id: 'social-1',
    label: 'GitHub',
    handle: '/0112engguh',           
    url: 'https://github.com/0112engguh',
  },
  {
    id: 'social-2',
    label: 'LinkedIn',
    handle: '/in/bagus-wicaksana',          
    url: 'https://www.linkedin.com/in/bagus-wicaksana/',
  },
  {
    id: 'social-3',
    label: 'Instagram',
    handle: '@engguuh',           
    url: 'https://www.instagram.com/engguuh/',
  },
  {
    id: 'social-4',
    label: 'E-mail',
    handle: 'baguswicaksana217@gmail.com',
    url: 'mailto:baguswicaksana217@gmail.com',
  },
];
