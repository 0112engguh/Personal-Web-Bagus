import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

type AnimVariant = 'fade-up' | 'fade-in' | 'fade-left' | 'slide-right';

interface AnimateProps {
  children: React.ReactNode;
  variant?: AnimVariant;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}

const variants: Record<AnimVariant, { hidden: string; visible: string }> = {
  'fade-up': {
    hidden: 'opacity-0 translate-y-5',
    visible: 'opacity-100 translate-y-0',
  },
  'fade-in': {
    hidden: 'opacity-0',
    visible: 'opacity-100',
  },
  'fade-left': {
    hidden: 'opacity-0 -translate-x-4',
    visible: 'opacity-100 translate-x-0',
  },
  'slide-right': {
    hidden: 'opacity-0 translate-x-4',
    visible: 'opacity-100 translate-x-0',
  },
};

export function Animate({
  children,
  variant = 'fade-up',
  delay = 0,
  className,
  as: Tag = 'div',
}: AnimateProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const v = variants[variant];

  return (
    <Tag
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        inView ? v.visible : v.hidden,
        className
      )}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Tag>
  );
}
