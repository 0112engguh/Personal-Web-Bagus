import { ExternalLink, Github } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      className="group relative p-5 rounded-xl border border-border bg-surface hover:border-white/15 hover:bg-white/[0.03] transition-all duration-300 h-full"
    >
      <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-bg mb-4 border border-border">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-display italic text-muted/40 text-4xl">
              {project.year}
            </span>
          </div>
        )}

        <span className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-widest text-muted bg-bg/80 backdrop-blur-sm px-2 py-1 rounded-md border border-border">
          {project.category}
        </span>
      </div>

      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-accent font-medium text-base leading-tight">
          {project.title}
        </h3>
        <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors"
              aria-label="Live site"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      <p className="text-subtle text-sm leading-relaxed mb-3">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
    </article>
  );
}
