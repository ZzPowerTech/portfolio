// src/components/Projects.tsx
import { motion } from 'framer-motion'
import { CURRENT_PROJECTS, PAST_PROJECTS } from '../data/projects'
import { useLanguage } from '../contexts/LanguageContext'
import { ProjectCard } from './ProjectCard'
import { SectionLabel } from './SectionLabel'

const item = {
  variants: { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } },
  transition: { duration: 0.4 },
}

export function Projects() {
  const { lang, t } = useLanguage()
  const [featured, ...otherCurrent] = CURRENT_PROJECTS

  return (
    <motion.section
      id="projects"
      className="section"
      aria-labelledby="projects-title"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
    >
      <SectionLabel path={t.projects.label} />
      <h2 id="projects-title" className="section-title">{t.projects.title}</h2>
      <p className="section-subtitle">{t.projects.subtitle}</p>

      <div className="grid-featured" style={{ marginBottom: 56 }}>
        {featured && (
          <motion.div {...item}>
            <ProjectCard project={featured} lang={lang} statusLabel={t.projects.status[featured.status]} featured />
          </motion.div>
        )}
        {otherCurrent.map(project => (
          <motion.div key={project.id} {...item}>
            <ProjectCard project={project} lang={lang} statusLabel={t.projects.status[project.status]} />
          </motion.div>
        ))}
      </div>

      <h2 className="section-title" style={{ fontSize: 22 }}>{t.projects.pastTitle}</h2>
      <p className="section-subtitle" style={{ marginBottom: 24 }}>{t.projects.pastSubtitle}</p>

      <div className="grid-3">
        {PAST_PROJECTS.map(project => (
          <motion.div key={project.id} {...item}>
            <ProjectCard project={project} lang={lang} statusLabel={t.projects.status[project.status]} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
