import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-surface border border-border',
        className
      )}
    />
  );
}

export function SkeletonText({ className }: SkeletonProps) {
  return <Skeleton className={cn('h-4 w-3/4', className)} />;
}

export function SkeletonBlock({ className }: SkeletonProps) {
  return <Skeleton className={cn('h-24 w-full', className)} />;
}
