import { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import type { Photo } from '@/data/photos';
import { cn } from '@/lib/utils';

interface LightboxProps {
  photos: Photo[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function Lightbox({ photos, currentIndex, onClose, onPrev, onNext }: LightboxProps) {
  const photo = photos[currentIndex];

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
      onClick={onClose}
      style={{ animation: 'fadeIn 0.2s ease' }}
    >
      <button
        className="absolute top-5 right-5 z-10 p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-all"
        onClick={onClose}
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="absolute top-5 left-5 z-10 font-mono text-xs text-white/30">
        {currentIndex + 1} / {photos.length}
      </div>

      <button
        className={cn(
          'absolute left-4 z-10 p-3 rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition-all',
          currentIndex === 0 && 'opacity-20 pointer-events-none'
        )}
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous photo"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        className={cn(
          'absolute right-4 z-10 p-3 rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition-all',
          currentIndex === photos.length - 1 && 'opacity-20 pointer-events-none'
        )}
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next photo"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div
        className="max-w-5xl max-h-[85vh] mx-16 flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={photo.id}
          src={photo.src}
          alt={photo.alt}
          className="max-h-[75vh] max-w-full object-contain rounded-lg"
          style={{ animation: 'fadeIn 0.25s ease' }}
        />

        <div className="flex items-center gap-4 text-center">
          <p className="text-white/60 text-sm font-mono">{photo.alt}</p>
          {photo.location && (
            <>
              <span className="text-white/20">·</span>
              <span className="flex items-center gap-1 text-white/40 text-xs font-mono">
                <MapPin className="w-3 h-3" />
                {photo.location}
              </span>
            </>
          )}
          <span className="text-white/20">·</span>
          <span className="text-white/30 text-xs font-mono">{photo.year}</span>
        </div>
      </div>
    </div>
  );
}
