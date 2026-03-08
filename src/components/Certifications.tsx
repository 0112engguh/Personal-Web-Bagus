import { certifications } from '@/data';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ArrowUpRight } from 'lucide-react';
import { Animate } from '@/components/ui/Animate';

export function Certifications() {
  return (
    <section>
      <Animate><SectionTitle>Certification</SectionTitle></Animate>
      <div className="space-y-1">
        {certifications.map((cert, i) => (
          <Animate key={cert.id} variant="fade-up" delay={i * 60}>
            <a
              href={cert.url ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between py-3.5 border-b border-border last:border-b-0 hover:border-white/15 transition-colors duration-200"
            >
              <div>
                <p className="text-accent text-sm font-medium group-hover:text-highlight transition-colors">
                  {cert.title}
                </p>
                <p className="text-xs font-mono text-muted mt-0.5">{cert.issuer}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-muted">{cert.date}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-muted group-hover:text-accent transition-colors" />
              </div>
            </a>
          </Animate>
        ))}
      </div>
    </section>
  );
}
