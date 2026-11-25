// src/components/Repos.tsx
import { useLanguage } from '../contexts/LanguageContext'
import { REPOS } from '../data/repos'
import { RepoCard } from './RepoCard'
import { SectionLabel } from './SectionLabel'

export function Repos() {
  const { lang, t } = useLanguage()

  return (
    <section id="repos" className="section" aria-labelledby="repos-title" style={{ paddingTop: 24 }}>
      <div className="container">
        <SectionLabel path={t.repos.label} />
        <h2 id="repos-title" className="section-title">{t.repos.title}</h2>
        <p className="section-subtitle" style={{ marginBottom: 0 }}>{t.repos.subtitle}</p>

        <ul className="repo-grid" style={{ listStyle: 'none' }}>
          {REPOS.map(repo => (
            <li key={repo.name}>
              <RepoCard repo={repo} lang={lang} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
