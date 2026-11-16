import { Layout } from '@/components/Layout';
import { Header } from '@/components/Header';
import { Overview } from '@/components/Overview';
import { Projects } from '@/components/Projects';
import { Experience } from '@/components/Experience';
// import { Certifications } from '@/components/Certifications';
import { Skills } from '@/components/Skills';
import { PhotographyPreview } from '@/components/photography/PhotographyPreview';
import { Footer } from '@/components/Footer';
import { Divider } from '@/components/ui/Divider';

export function HomePage() {
  return (
    <Layout>
      <Header />
      <Divider />
      <Overview />
      <Divider />
      <Projects />
      <Divider />
      <Experience />
      <Divider />
      <PhotographyPreview />
      {/* <Divider /> */}
      {/* <Certifications /> */}
      <Divider />
      <Skills />
      <Footer />
    </Layout>
  );
}
