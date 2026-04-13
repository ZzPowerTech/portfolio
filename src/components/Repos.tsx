// src/components/Repos.tsx
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { useGitHubRepos } from '../hooks/useGitHubRepos'
import { RepoCard } from './RepoCard'

export function Repos() {
  const { t } = useLanguage()
  const { repos, loading, error } = useGitHubRepos()

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
      style={{ padding: '0 80px 80px' }}
    >
      <p style={{ color: 'var(--purple-500)', fontSize: 10, letterSpacing: 4, fontWeight: 600, marginBottom: 8 }}>
        {t.repos.label}
      </p>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
        {t.repos.title}
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: 11, marginBottom: 24 }}>
        {t.repos.subtitle}
      </p>

      {loading && (
        <p style={{ color: 'var(--text-muted)', fontSize: 12 }}>Carregando repositórios...</p>
      )}

      {error && (
        <p style={{ color: '#ef4444', fontSize: 12 }}>Erro ao carregar repositórios: {error}</p>
      )}

      {!loading && !error && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {repos.map(repo => (
            <motion.div
              key={repo.name}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.35 }}
            >
              <RepoCard repo={repo} />
            </motion.div>
          ))}
        </div>
      )}
    </motion.section>
  )
}
