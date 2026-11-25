// src/components/Footer.tsx
import { useLanguage } from '../contexts/LanguageContext'
import { GH_ICON, LI_ICON, LINKS } from './icons'

const linkStyle: React.CSSProperties = {
  color: 'var(--text-muted)',
  fontSize: 11,
  display: 'flex',
  alignItems: 'center',
  gap: 4,
}

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="site-footer">
      <p style={{ color: 'var(--text-muted)', fontSize: 11 }}>{t.footer.copyright}</p>

      <div style={{ display: 'flex', gap: 16 }}>
        <a href={LINKS.github} target="_blank" rel="noopener noreferrer me" aria-label="GitHub" style={linkStyle}>
          {GH_ICON} GitHub
        </a>
        <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer me" aria-label="LinkedIn" style={linkStyle}>
          {LI_ICON} LinkedIn
        </a>
      </div>
    </footer>
  )
}
