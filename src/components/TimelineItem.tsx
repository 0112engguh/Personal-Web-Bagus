import { MapPin } from 'lucide-react';
import type { Experience } from '@/types';
import { cn } from '@/lib/utils';

interface TimelineItemProps {
  item: Experience;
  isLast?: boolean;
}

export function TimelineItem({ item, isLast = false }: TimelineItemProps) {
  return (
    <div className={cn('flex gap-4', !isLast && 'pb-6')}>
      {/* Timeline indicator */}
      <div className="flex flex-col items-center flex-shrink-0 w-4 mt-1">
        <div className="w-1.5 h-1.5 rounded-full bg-border ring-2 ring-bg flex-shrink-0" />
        {!isLast && <div className="w-px flex-1 bg-border mt-2" />}
      </div>

      {/* Content */}
      <div className="flex-1 pb-1">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
          <div>
            <p className="text-xs font-mono text-muted mb-0.5">{item.company}</p>
            <h3 className="text-accent text-sm font-medium leading-snug">{item.role}</h3>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-1 flex-shrink-0">
            <span className="text-xs font-mono text-muted">{item.period}</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-muted/60">
              <MapPin className="w-3 h-3" />
              {item.location}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-subtle text-sm leading-relaxed">{item.description}</p>
      </div>
    </div>
  );
}
