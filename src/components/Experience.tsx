import { experiences, education } from '@/data';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { TimelineItem } from '@/components/TimelineItem';
import { Animate } from '@/components/ui/Animate';

export function Experience() {
  return (
    <>
      <section>
        <Animate><SectionTitle>Experience</SectionTitle></Animate>
        <div>
          {experiences.map((exp, i) => (
            <Animate key={exp.id} variant="fade-up" delay={i * 80}>
              <TimelineItem item={exp} isLast={i === experiences.length - 1} />
            </Animate>
          ))}
        </div>
      </section>

      <section>
        <Animate><SectionTitle>Education</SectionTitle></Animate>
        <div>
          {education.map((edu, i) => (
            <Animate key={edu.id} variant="fade-up" delay={i * 80}>
              <TimelineItem item={edu} isLast={i === education.length - 1} />
            </Animate>
          ))}
        </div>
      </section>
    </>
  );
}
