import { useState } from 'react';
import { MapPin, ZoomIn } from 'lucide-react';
import type { Photo } from '@/data/photos';
import { cn } from '@/lib/utils';

interface PhotoCardProps {
  photo: Photo;
  onClick: () => void;
  className?: string;
}

export function PhotoCard({ photo, onClick, className }: PhotoCardProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative overflow-hidden rounded-xl bg-surface border border-border',
        'hover:border-white/15 transition-all duration-300 cursor-zoom-in text-left w-full',
        className
      )}
      aria-label={`View photo: ${photo.alt}`}
    >
      {/* Skeleton */}
      {!loaded && (
        <div className="absolute inset-0 bg-surface animate-pulse" />
      )}

      <img
        src={photo.thumb}
        alt={photo.alt}
        onLoad={() => setLoaded(true)}
        className={cn(
          'w-full h-full object-cover transition-all duration-500',
          'group-hover:scale-[1.03]',
          loaded ? 'opacity-100' : 'opacity-0'
        )}
        loading="lazy"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
        <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100" />
      </div>

      {/* Bottom meta */}
      <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-white text-xs font-mono truncate">{photo.alt}</p>
        {photo.location && (
          <p className="flex items-center gap-1 text-white/60 text-[10px] font-mono mt-0.5">
            <MapPin className="w-2.5 h-2.5" />
            {photo.location} · {photo.year}
          </p>
        )}
      </div>
    </button>
  );
}
