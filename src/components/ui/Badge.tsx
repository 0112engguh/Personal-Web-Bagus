import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'accent';
}

export function Badge({ children, className, variant = 'default' }: BadgeProps) {
  const variants = {
    default: 'bg-white/5 text-subtle border border-border',
    outline: 'border border-border text-muted',
    accent: 'bg-highlight/10 text-highlight border border-highlight/20',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-mono tracking-wide',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
