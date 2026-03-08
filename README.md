# Personal Portfolio — React + TypeScript + Tailwind

Personal website terinspirasi dari [unti.framer.website](https://unti.framer.website/), dibangun dengan React, TypeScript, Vite, dan Tailwind CSS.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Build untuk production
npm run build
```

## ✨ Fitur

- **Page Transitions** — fade + slide saat berpindah halaman (`/` ↔ `/photography`)
- **Scroll Animations** — setiap section muncul saat di-scroll (Intersection Observer, no library)
- **Staggered Reveals** — elemen masuk berurutan dengan delay
- **Photography Section** — preview 3 foto di homepage + tombol ke gallery
- **Gallery Page** (`/photography`) — masonry grid, filter per kategori, lightbox dengan navigasi keyboard
- **Photo Lightbox** — keyboard shortcuts: `←` `→` navigasi, `Esc` tutup
- **Live Clock** — jam realtime di header
- **Skeleton Loading** — placeholder saat foto belum load

## ✏️ Kustomisasi

### Data personal
Edit **`src/data/index.ts`** — nama, bio, project, pengalaman, skill, sosial.

### Foto gallery
Edit **`src/data/photos.ts`**:
```ts
{
  id: 'p1',
  src: '/photos/foto-asli.jpg',     // resolusi tinggi untuk lightbox
  thumb: '/photos/foto-thumb.jpg',  // resolusi kecil untuk grid
  alt: 'Deskripsi foto',
  category: 'street',               // street | architecture | portrait | nature | abstract
  location: 'Jakarta',
  year: '2024',
  featured: true,                   // tampil di preview homepage
}
```
Taruh file foto di `public/photos/`.

### Tambah kategori foto
Di `src/data/photos.ts`, tambah ke array `photoCategories` dan tambahkan type baru di union type `Photo['category']`.

### Foto profil
Taruh `avatar.jpg` di `public/`, lalu edit `src/components/Header.tsx`:
```tsx
<img src="/avatar.jpg" alt="Namamu" className="w-full h-full object-cover" />
```

## 📁 Struktur

```
src/
├── components/
│   ├── ui/
│   │   ├── Animate.tsx          ← scroll-triggered animation wrapper
│   │   ├── Badge.tsx
│   │   ├── SectionTitle.tsx
│   │   └── Divider.tsx
│   ├── photography/
│   │   ├── PhotoCard.tsx        ← card dengan hover + skeleton
│   │   ├── Lightbox.tsx         ← full-screen lightbox + keyboard nav
│   │   └── PhotographyPreview.tsx ← section preview di homepage
│   ├── Layout.tsx
│   ├── Header.tsx               ← hero + live clock
│   ├── Overview.tsx
│   ├── Projects.tsx / ProjectCard.tsx
│   ├── Experience.tsx / TimelineItem.tsx
│   ├── Certifications.tsx
│   ├── Skills.tsx
│   └── Footer.tsx
├── pages/
│   ├── HomePage.tsx             ← route "/"
│   └── GalleryPage.tsx          ← route "/photography"
├── hooks/
│   ├── useInView.ts             ← Intersection Observer hook
│   └── usePageTransition.ts
├── data/
│   ├── index.ts                 ← data personal
│   └── photos.ts                ← data foto
└── types/index.ts
```

## 📦 Dependencies

- **React 18** + **TypeScript**
- **Vite** — build tool
- **Tailwind CSS** — styling
- **React Router DOM v6** — routing + page transitions
- **lucide-react** — icons

Tidak perlu shadcn/ui. Kalau mau tambah komponen (toast, dropdown, dll), bisa install shadcn nanti.
