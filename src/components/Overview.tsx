import { usePersonalInfo } from '@/hooks/useSupabase';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Animate } from '@/components/ui/Animate';
import { SkeletonText } from '@/components/ui/Skeleton';

export function Overview() {
  const { data: info, loading } = usePersonalInfo();

  return (
    <section>
      <Animate>
        <SectionTitle>Overview</SectionTitle>
      </Animate>
      <div className="space-y-4">
        {loading ? (
          <>
            <SkeletonText className="w-full h-4" />
            <SkeletonText className="w-5/6 h-4" />
            <SkeletonText className="w-full h-4 mt-4" />
            <SkeletonText className="w-4/6 h-4" />
          </>
        ) : (
          info?.bio?.map((paragraph, i) => (
            <Animate key={i} variant="fade-up" delay={i * 80}>
              <p className="text-subtle leading-relaxed text-[15px]">
                {paragraph}
              </p>
            </Animate>
          ))
        )}
      </div>
    </section>
  );
}
