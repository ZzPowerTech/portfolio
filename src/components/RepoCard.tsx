// src/components/RepoCard.tsx
import { motion } from 'framer-motion'
import type { Repo } from '../data/repos'
import type { Language } from '../data/translations'

const LANG_COLORS: Record<string, string> = {
  Java: '#f89820',
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Python: '#3572a5',
  Kotlin: '#7f52ff',
}

interface RepoCardProps {
  repo: Repo
  lang: Language
}

export function RepoCard({ repo, lang }: RepoCardProps) {
  return (
    <motion.a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -3, borderColor: 'rgba(124,58,237,0.35)' }}
      transition={{ duration: 0.2 }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 10, padding: 16, height: '100%',
        display: 'flex', flexDirection: 'column', gap: 8,
        textDecoration: 'none', cursor: 'pointer',
        position: 'relative',
      }}
    >
      <span aria-hidden="true" style={{ position: 'absolute', top: 12, right: 12, color: 'rgba(168,85,247,0.5)', fontSize: 11 }}>↗</span>

      <h3 style={{ color: 'var(--text-primary)', fontSize: 13, fontWeight: 600, paddingRight: 18 }}>
        {repo.name}
      </h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: 12, lineHeight: 1.55, flex: 1 }}>
        {repo.desc[lang]}
      </p>

      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <span aria-hidden="true" style={{
          width: 8, height: 8, borderRadius: '50%', display: 'inline-block',
          background: LANG_COLORS[repo.language] ?? '#94a3b8',
        }} />
        <span style={{ color: 'var(--text-secondary)', fontSize: 11 }}>{repo.language}</span>
      </span>
    </motion.a>
  )
}
