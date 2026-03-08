import { personalInfo } from '@/data';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Animate } from '@/components/ui/Animate';

export function Overview() {
  return (
    <section>
      <Animate>
        <SectionTitle>Overview</SectionTitle>
      </Animate>
      <div className="space-y-4">
        {personalInfo.bio.map((paragraph, i) => (
          <Animate key={i} variant="fade-up" delay={i * 80}>
            <p className="text-subtle leading-relaxed text-[15px]">
              {paragraph}
            </p>
          </Animate>
        ))}
      </div>
    </section>
  );
}
