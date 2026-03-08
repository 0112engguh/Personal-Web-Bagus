import { projects } from '@/data';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ProjectCard } from '@/components/ProjectCard';
import { Animate } from '@/components/ui/Animate';

export function Projects() {
  return (
    <section>
      <Animate>
        <SectionTitle>Projects</SectionTitle>
      </Animate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((project, i) => (
          <Animate key={project.id} variant="fade-up" delay={i * 80}>
            <ProjectCard project={project} />
          </Animate>
        ))}
      </div>
    </section>
  );
}
