// src/components/Projects.tsx
import { CURRENT_PROJECTS, PAST_PROJECTS } from '../data/projects'
import { useLanguage } from '../contexts/LanguageContext'
import { FeaturedProject, ProjectRow } from './ProjectCard'
import { SectionLabel } from './SectionLabel'

export function Projects() {
  const { lang, t } = useLanguage()
  const p = t.projects

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <SectionLabel path={p.label} />
        <h2 id="projects-title" className="section-title">{p.title}</h2>
        <p className="section-subtitle" style={{ marginBottom: 0 }}>{p.subtitle}</p>

        {CURRENT_PROJECTS.map(project => (
          <FeaturedProject
            key={project.id}
            project={project}
            lang={lang}
            statusLabel={p.status[project.status]}
            visitLabel={p.visit}
            invoice={p.invoice}
          />
        ))}

        <h3 className="subsection-title">{p.pastTitle}</h3>
        <ul className="project-rows" aria-label={p.pastTitle}>
          {PAST_PROJECTS.map(project => (
            <ProjectRow key={project.id} project={project} lang={lang} statusLabel={p.status[project.status]} />
          ))}
        </ul>
      </div>
    </section>
  )
}
