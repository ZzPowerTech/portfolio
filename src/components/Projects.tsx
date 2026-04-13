// src/components/Projects.tsx
import { motion } from 'framer-motion'
import { PROJECTS } from '../data/projects'
import { useLanguage } from '../contexts/LanguageContext'
import { ProjectCard } from './ProjectCard'

export function Projects() {
  const { lang, t } = useLanguage()

  return (
    <motion.section
      id="projects"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      style={{ padding: '80px 80px' }}
    >
      <p style={{ color: 'var(--purple-500)', fontSize: 10, letterSpacing: 4, fontWeight: 600, marginBottom: 8 }}>
        {t.projects.label}
      </p>
      <h2 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-1px', color: 'var(--text-primary)', marginBottom: 8 }}>
        {t.projects.title}
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 40 }}>
        {t.projects.subtitle}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {PROJECTS.map(project => (
          <motion.div
            key={project.id}
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.4 }}
          >
            <ProjectCard project={project} lang={lang} onlineBadge={t.projects.online} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
