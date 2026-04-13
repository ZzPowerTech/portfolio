// src/components/RepoCard.tsx
import { motion } from 'framer-motion'
import type { GitHubRepo } from '../hooks/useGitHubRepos'

const LANG_COLORS: Record<string, string> = {
  Java: '#f89820',
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Python: '#3572a5',
  Kotlin: '#7f52ff',
}

interface RepoCardProps {
  repo: GitHubRepo
}

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={repo.name}
      whileHover={{ y: -3, borderColor: 'rgba(124,58,237,0.35)' }}
      transition={{ duration: 0.2 }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 10, padding: 16,
        display: 'flex', flexDirection: 'column', gap: 8,
        textDecoration: 'none', cursor: 'pointer',
        position: 'relative',
      }}
    >
      <span style={{ position: 'absolute', top: 12, right: 12, color: 'rgba(124,58,237,0.25)', fontSize: 11 }}>↗</span>

      <p style={{ color: 'var(--text-primary)', fontSize: 12, fontWeight: 600, paddingRight: 18 }}>
        {repo.name}
      </p>
      <p style={{ color: 'var(--text-muted)', fontSize: 10, lineHeight: 1.5, flex: 1 }}>
        {repo.description ?? '—'}
      </p>

      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        {repo.language && (
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%', display: 'inline-block',
              background: LANG_COLORS[repo.language] ?? '#94a3b8',
            }} />
            <span style={{ color: 'var(--text-secondary)', fontSize: 10 }}>{repo.language}</span>
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span style={{ color: 'var(--text-muted)', fontSize: 10 }}>★ {repo.stargazers_count}</span>
        )}
      </div>
    </motion.a>
  )
}
