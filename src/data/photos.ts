export interface Photo {
  id: string;
  src: string;
  thumb: string;
  alt: string;
  category: 'street' | 'architecture' | 'portrait' | 'nature' | 'abstract';
  location?: string;
  year: string;
  featured?: boolean;
}


export const photos: Photo[] = [
  {
    id: 'p1',
    src: '/photos/DSCF2425.JPG',
    thumb: '/photos/DSCF2425.JPG',
    alt: 'Persimpangan dekat stasiun Sudirman',
    category: 'street',
    location: 'Jakarta',
    year: '2025',
    featured: true,
  },
  {
    id: 'p2',
    src: '/photos/flare.jpeg',
    thumb: '/photos/flare.jpeg',
    alt: 'A boy celebrating a moment of victory',
    category: 'street',
    location: 'Depok',
    year: '2024',
    featured: true,
  },
  {
    id: 'p3',
    src: '/photos/arsip.jpeg',
    thumb: '/photos/arsip.jpeg',
    alt: 'Prewedding - Formal Theme',
    category: 'portrait',
    location: 'Bogor',
    year: '2024',
  },
  {
    id: 'p4',
    src: '/photos/042A1271.jpg',
    thumb: '/photos/042A1271.jpg',
    alt: 'Prewedding - Blue Strip Theme',
    category: 'portrait',
    location: 'Bogor',
    year: '2024',
  },
  {
    id: 'p5',
    src: '/photos/kak-ines.jpg',
    thumb: 'photos/kak-ines.jpg',
    alt: 'Prewedding - Jersey Theme',
    category: 'portrait',
    location: 'Bogor',
    year: '2024',
    featured: true,
  },
];

export const featuredPhotos = photos.filter((p) => p.featured);

export const photoCategories = [
  { id: 'all', label: 'All' },
  { id: 'street', label: 'Street' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'nature', label: 'Nature' },
  { id: 'portrait', label: 'Portrait' },
  { id: 'abstract', label: 'Abstract' },
] as const;
