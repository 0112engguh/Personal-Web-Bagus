import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { photos, photoCategories } from '@/data/photos';
import type { Photo } from '@/data/photos';
import { PhotoCard } from '@/components/photography/PhotoCard';
import { Lightbox } from '@/components/photography/Lightbox';
import { Animate } from '@/components/ui/Animate';
import { cn } from '@/lib/utils';

export function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo<Photo[]>(() => {
    if (activeCategory === 'all') return photos;
    return photos.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-bg text-accent">
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '150px 150px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 py-10">
        <Animate variant="fade-left">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-muted hover:text-accent transition-colors mb-10 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Back
          </Link>
        </Animate>

        <Animate variant="fade-up" delay={50}>
          <div className="mb-10">
            <h1 className="text-4xl sm:text-5xl font-display font-normal text-accent mb-2">
              Photography
            </h1>
            <p className="text-subtle font-mono text-sm">
              {photos.length} frames — street, architecture & everything between
            </p>
          </div>
        </Animate>

        <Animate variant="fade-up" delay={100}>
          <div className="flex flex-wrap gap-2 mb-8">
            {photoCategories.map((cat) => {
              const count = cat.id === 'all' ? photos.length : photos.filter((p) => p.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200',
                    activeCategory === cat.id
                      ? 'bg-accent text-bg'
                      : 'border border-border text-muted hover:border-white/15 hover:text-accent bg-surface'
                  )}
                >
                  {cat.label}
                  <span className={cn(
                    'ml-1.5 text-[10px] opacity-60',
                    activeCategory === cat.id ? 'text-bg' : 'text-muted'
                  )}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </Animate>

        <div
          className="columns-2 sm:columns-3 gap-3 space-y-3"
          style={{ columnFill: 'balance' }}
        >
          {filtered.map((photo, i) => (
            <Animate
              key={photo.id}
              variant="fade-up"
              delay={Math.min(i * 40, 300)}
              className="break-inside-avoid mb-3"
            >
              <PhotoCard
                photo={photo}
                onClick={() => setLightboxIndex(i)}
                className={cn(
                  'w-full',
                  // alternate heights for masonry feel
                  i % 5 === 0 ? 'aspect-[3/4]' :
                  i % 5 === 2 ? 'aspect-[4/5]' :
                  'aspect-square'
                )}
              />
            </Animate>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted font-mono text-sm">
            No photos in this category yet.
          </div>
        )}

        <Animate className="mt-12 pb-8 text-center">
          <p className="text-muted/40 text-xs font-mono">
            Shot on various cameras · All photos by me
          </p>
        </Animate>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          photos={filtered}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => Math.max(0, (i ?? 0) - 1))}
          onNext={() =>
            setLightboxIndex((i) => Math.min(filtered.length - 1, (i ?? 0) + 1))
          }
        />
      )}
    </div>
  );
}
