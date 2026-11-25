// src/components/Header.tsx
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { GH_ICON, LI_ICON, LINKS } from './icons'

const linkStyle: React.CSSProperties = {
  color: 'var(--text-secondary)',
  fontSize: 13,
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  transition: 'color 0.2s',
}

export function Header() {
  const { lang, t, toggle } = useLanguage()

  return (
    <motion.header
      className="site-header"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(3, 7, 18, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(124, 58, 237, 0.12)',
      }}
    >
      <a href="#top" aria-label="Murillo Weiss Kist" style={{ color: 'var(--purple-500)', fontWeight: 800, fontSize: 16, letterSpacing: '-0.5px' }}>
        MW.
      </a>

      <nav className="site-nav" aria-label={lang === 'pt' ? 'Navegação principal' : 'Main navigation'}>
        <a href="#about" className="nav-optional" style={linkStyle}>{t.nav.about}</a>
        <a href="#projects" style={linkStyle}>{t.nav.projects}</a>
        <a href="#repos" className="nav-optional" style={linkStyle}>{t.nav.repos}</a>
        <a href={LINKS.github} target="_blank" rel="noopener noreferrer me" aria-label="GitHub" style={linkStyle}>
          {GH_ICON} <span className="nav-optional">GitHub</span>
        </a>
        <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer me" aria-label="LinkedIn" style={linkStyle}>
          {LI_ICON} <span className="nav-optional">LinkedIn</span>
        </a>
        <button
          type="button"
          onClick={toggle}
          aria-label={lang === 'pt' ? 'Switch to English' : 'Mudar para português'}
          style={{
            background: 'rgba(124, 58, 237, 0.12)',
            border: '1px solid rgba(124, 58, 237, 0.25)',
            color: 'var(--purple-500)',
            padding: '5px 12px',
            borderRadius: 6,
            fontSize: 11,
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          {lang === 'pt' ? 'PT | EN' : 'EN | PT'}
        </button>
      </nav>
    </motion.header>
  )
}
