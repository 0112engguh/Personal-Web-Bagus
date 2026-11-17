import { Layout } from '@/components/Layout';
import { Header } from '@/components/Header';
import { GitHubActivity } from '@/components/GitHubActivity';
import { Overview } from '@/components/Overview';
import { Projects } from '@/components/Projects';
import { Experience } from '@/components/Experience';
// import { Certifications } from '@/components/Certifications';
import { Skills } from '@/components/Skills';
import { PhotographyPreview } from '@/components/photography/PhotographyPreview';
import { Footer } from '@/components/Footer';

export function HomePage() {
  return (
    <Layout>
      <div className="space-y-16">
        <section id="home"><Header /></section>
        <GitHubActivity />
        <section id="about"><Overview /></section>
        <section id="work" className="space-y-12">
          <Projects />
          <Experience />
          <Skills />
        </section>
        <section id="photos"><PhotographyPreview /></section>
        {/* <Certifications /> */}
        <div id="contact"><Footer /></div>
      </div>
    </Layout>
  );
}
