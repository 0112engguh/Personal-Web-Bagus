import { socialLinks, personalInfo } from '@/data';
import { ArrowUpRight } from 'lucide-react';
import { Animate } from '@/components/ui/Animate';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="pt-10 pb-12 mt-4">
      <div className="space-y-1 mb-10">
        {socialLinks.map((link, i) => (
          <Animate key={link.id} variant="fade-up" delay={i * 50}>
            <a
              href={link.url}
              target={link.url.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="group flex items-center justify-between py-3.5 border-b border-border last:border-b-0 hover:border-white/15 transition-colors"
            >
              <div>
                <p className="text-xs font-mono text-muted mb-0.5">{link.label}</p>
                <p className="text-accent text-sm font-medium group-hover:text-highlight transition-colors">
                  {link.handle}
                </p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-accent transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Animate>
        ))}
      </div>

      <Animate variant="fade-in">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-4">
          <p className="text-xs font-mono text-muted/50">
            {year} © {personalInfo.name}
          </p>
          <p className="text-xs font-mono text-muted/30">
            Built with React + TypeScript + Tailwind
          </p>
        </div>
      </Animate>
    </footer>
  );
}
