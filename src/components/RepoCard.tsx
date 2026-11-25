// src/components/RepoCard.tsx
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
    <a className="repo-card" href={repo.url} target="_blank" rel="noopener noreferrer">
      <h3 className="repo-name"><span>ZzPowerTech/</span>{repo.name}</h3>
      <p className="repo-desc">{repo.desc[lang]}</p>
      <span className="repo-lang">
        <i aria-hidden="true" style={{ background: LANG_COLORS[repo.language] ?? '#94a3b8' }} />
        {repo.language}
      </span>
    </a>
  )
}
