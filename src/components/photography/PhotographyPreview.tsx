import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Camera } from 'lucide-react';
import { useFeaturedPhotos } from '@/hooks/useSupabase';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Animate } from '@/components/ui/Animate';
import { PhotoCard } from '@/components/photography/PhotoCard';
import { Lightbox } from '@/components/photography/Lightbox';
import { Skeleton } from '@/components/ui/Skeleton';

export function PhotographyPreview() {
  const { data: featuredPhotos, loading } = useFeaturedPhotos();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const photos = featuredPhotos ?? [];

  return (
    <section>
      <Animate>
        <div className="flex items-center justify-between mb-8">
          <SectionTitle className="mb-0">Photography</SectionTitle>
          <Link
            to="/photography"
            className="group inline-flex items-center gap-1.5 text-xs font-mono text-muted hover:text-accent transition-colors"
          >
            View all
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </Animate>

      <div className="grid grid-cols-3 gap-2 h-52">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-52 rounded-lg" />
            ))
          : photos.slice(0, 3).map((photo, i) => (
              <Animate key={photo.id} variant="fade-up" delay={i * 80}>
                <PhotoCard
                  photo={{
                    id: photo.id,
                    src: photo.src,
                    thumb: photo.thumb ?? photo.src,
                    alt: photo.alt,
                    category: photo.category,
                    location: photo.location ?? undefined,
                    year: photo.year,
                    featured: photo.featured,
                  }}
                  onClick={() => setLightboxIndex(i)}
                  className="h-52"
                />
              </Animate>
            ))}
      </div>

      <Animate delay={200}>
        <Link
          to="/photography"
          className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-border bg-surface text-subtle text-sm font-mono hover:border-white/15 hover:text-accent hover:bg-white/[0.03] transition-all duration-200"
        >
          <Camera className="w-4 h-4" />
          See all photos
        </Link>
      </Animate>

      {lightboxIndex !== null && (
        <Lightbox
          photos={photos.map((p) => ({
            id: p.id,
            src: p.src,
            thumb: p.thumb ?? p.src,
            alt: p.alt,
            category: p.category,
            location: p.location ?? undefined,
            year: p.year,
            featured: p.featured,
          }))}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => Math.max(0, (i ?? 0) - 1))}
          onNext={() =>
            setLightboxIndex((i) => Math.min(photos.length - 1, (i ?? 0) + 1))
          }
        />
      )}
    </section>
  );
}
