import { useExperiences } from '@/hooks/useSupabase';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { TimelineItem } from '@/components/TimelineItem';
import { Animate } from '@/components/ui/Animate';
import { Skeleton } from '@/components/ui/Skeleton';

export function Experience() {
  const { data: workExperiences, loading: loadingWork } = useExperiences('work');
  const { data: educationExperiences, loading: loadingEdu } = useExperiences('education');

  return (
    <>
      <section>
        <Animate><SectionTitle>Experience</SectionTitle></Animate>
        <div>
          {loadingWork ? (
            <div className="space-y-4">
              <Skeleton className="h-20 w-full" />
            </div>
          ) : (
            workExperiences?.map((exp, i) => (
              <Animate key={exp.id} variant="fade-up" delay={i * 80}>
                <TimelineItem
                  item={{
                    id: exp.id,
                    company: exp.company,
                    role: exp.role,
                    period: exp.period,
                    location: exp.location,
                    description: exp.description,
                    type: exp.type,
                  }}
                  isLast={i === (workExperiences?.length ?? 0) - 1}
                />
              </Animate>
            ))
          )}
        </div>
      </section>

      <section>
        <Animate><SectionTitle>Education</SectionTitle></Animate>
        <div>
          {loadingEdu ? (
            <div className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          ) : (
            educationExperiences?.map((edu, i) => (
              <Animate key={edu.id} variant="fade-up" delay={i * 80}>
                <TimelineItem
                  item={{
                    id: edu.id,
                    company: edu.company,
                    role: edu.role,
                    period: edu.period,
                    location: edu.location,
                    description: edu.description,
                    type: edu.type,
                  }}
                  isLast={i === (educationExperiences?.length ?? 0) - 1}
                />
              </Animate>
            ))
          )}
        </div>
      </section>
    </>
  );
}
