import { useEffect, useState } from 'react';
import { usePersonalInfo } from '@/hooks/useSupabase';
import { formatTime } from '@/lib/utils';
import { Download, Mail, Circle } from 'lucide-react';
import { Skeleton, SkeletonText } from '@/components/ui/Skeleton';

export function Header() {
  const { data: info, loading } = usePersonalInfo();
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header
      className="pt-12 pb-10 transition-all duration-700 ease-out"
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(16px)',
      }}
    >
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-2 text-xs font-mono text-muted">
          {loading ? (
            <SkeletonText className="w-40 h-3" />
          ) : (
            <span>{info?.location}</span>
          )}
        </div>
        <div className="text-xs font-mono text-muted tabular-nums">
          {formatTime(time)}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <div
          className="relative flex-shrink-0 transition-all duration-700 delay-100"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(12px)',
          }}
        >
          <div className="w-20 h-20 rounded-2xl bg-surface border border-border overflow-hidden">
            {loading ? (
              <Skeleton className="w-full h-full rounded-2xl" />
            ) : (
              <img
                src={info?.avatar_url}
                alt={info?.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>

        <div
          className="flex-1 transition-all duration-700 delay-150"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(12px)',
          }}
        >
          {loading ? (
            <div className="space-y-3">
              <SkeletonText className="w-24 h-5" />
              <SkeletonText className="w-48 h-8" />
              <SkeletonText className="w-64 h-4" />
            </div>
          ) : (
            <>
              {info?.available_for_work && (
                <div className="inline-flex items-center gap-1.5 mb-3 px-2.5 py-1 rounded-full border border-border bg-surface text-xs font-mono text-subtle">
                  <Circle className="w-1.5 h-1.5 fill-emerald-400 text-emerald-400" />
                  Available for Work
                </div>
              )}

              <h1 className="text-3xl sm:text-4xl font-display font-normal text-accent leading-tight mb-1">
                {info?.name}
              </h1>
              <p className="text-sm text-muted font-mono">{info?.subtitle}</p>

              <div
                className="flex items-center gap-3 mt-5 transition-all duration-700 delay-200"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(8px)',
                }}
              >
                <a
                  href={info?.cv_url}
                  download
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-surface text-accent text-sm font-mono hover:bg-white/5 hover:border-white/20 active:scale-95 transition-all duration-200"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download CV
                </a>
                <a
                  href={`mailto:${info?.email}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-bg text-sm font-mono font-medium hover:bg-highlight active:scale-95 transition-all duration-200"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Get in Touch
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
