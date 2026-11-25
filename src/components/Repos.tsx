// src/components/Repos.tsx
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { REPOS } from '../data/repos'
import { RepoCard } from './RepoCard'
import { SectionLabel } from './SectionLabel'

export function Repos() {
  const { lang, t } = useLanguage()

  return (
    <motion.section
      id="repos"
      className="section"
      aria-labelledby="repos-title"
      style={{ paddingTop: 0 }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
    >
      <SectionLabel path={t.repos.label} />
      <h2 id="repos-title" className="section-title" style={{ fontSize: 22 }}>{t.repos.title}</h2>
      <p className="section-subtitle" style={{ marginBottom: 24 }}>{t.repos.subtitle}</p>

      <div className="grid-3" style={{ gap: 12 }}>
        {REPOS.map(repo => (
          <motion.div
            key={repo.name}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.35 }}
          >
            <RepoCard repo={repo} lang={lang} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
