import { cn } from '@/lib/utils';

export function Divider({ className }: { className?: string }) {
  return <hr className={cn('border-border my-10', className)} />;
}
