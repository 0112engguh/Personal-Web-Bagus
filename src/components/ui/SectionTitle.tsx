import { cn } from '@/lib/utils';

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionTitle({ children, className }: SectionTitleProps) {
  return (
    <h2
      className={cn(
        'text-xs font-mono uppercase tracking-widest text-muted mb-8 flex items-center gap-3',
        className
      )}
    >
      <span className="inline-block w-4 h-px bg-border" />
      {children}
    </h2>
  );
}
