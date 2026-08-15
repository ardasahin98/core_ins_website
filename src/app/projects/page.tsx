import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import { Section, SectionHead, ProjectCard } from '@/components/ui';
import { getProjects } from '@/lib/content';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Completed instrumentation and monitoring projects across dams, tailings, tunnels, excavations, bridges and slopes.',
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <Section>
      <Reveal>
        <SectionHead
          eyebrow="Completed projects"
          title="What we have built and watched"
          lead="Each project sets out the problem, the scheme we installed, and what the client got out of it."
        />
      </Reveal>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 3) * 80}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
