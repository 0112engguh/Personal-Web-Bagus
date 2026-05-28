import { useProjects } from '@/hooks/useSupabase';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ProjectCard } from '@/components/ProjectCard';
import { Animate } from '@/components/ui/Animate';
import { Skeleton } from '@/components/ui/Skeleton';

export function Projects() {
  const { data: projects, loading } = useProjects();

  return (
    <section>
      <Animate>
        <SectionTitle>Projects</SectionTitle>
      </Animate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {loading
          ? Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} className="h-72 w-full rounded-xl" />
            ))
          : projects?.map((project, i) => (
              <Animate key={project.id} variant="fade-up" delay={i * 80}>
                <ProjectCard
                  project={{
                    id: project.id,
                    title: project.title,
                    category: project.category,
                    description: project.description,
                    tags: project.tags,
                    imageUrl: project.image_url ?? undefined,
                    liveUrl: project.live_url ?? undefined,
                    githubUrl: project.github_url ?? undefined,
                    year: project.year,
                  }}
                />
              </Animate>
            ))}
      </div>
    </section>
  );
}
