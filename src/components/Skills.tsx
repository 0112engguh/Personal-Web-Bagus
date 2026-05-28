import { useSkills } from '@/hooks/useSupabase';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Animate } from '@/components/ui/Animate';
import { Skeleton } from '@/components/ui/Skeleton';

const categoryLabels: Record<string, string> = {
  Language: 'Languages',
  Tools: 'Tools & Dev',
};

export function Skills() {
  const { data: skills, loading } = useSkills();

  const grouped = (skills ?? []).reduce<Record<string, typeof skills>>(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category]!.push(skill);
      return acc;
    },
    {}
  );

  return (
    <section>
      <Animate><SectionTitle>Skills</SectionTitle></Animate>
      <div className="space-y-6">
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-6 w-24" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-9 w-24" />
              ))}
            </div>
          </div>
        ) : (
          Object.entries(grouped).map(([category, items], gi) => (
            <Animate key={category} variant="fade-up" delay={gi * 80}>
              <div>
                <p className="text-xs font-mono text-muted/60 uppercase tracking-widest mb-3">
                  {categoryLabels[category] ?? category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {items?.map((skill) => (
                    <span
                      key={skill.id}
                      className="px-3 py-1.5 text-sm font-mono text-subtle border border-border rounded-lg bg-surface hover:border-white/15 hover:text-accent transition-all duration-200 cursor-default"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </Animate>
          ))
        )}
      </div>
    </section>
  );
}
